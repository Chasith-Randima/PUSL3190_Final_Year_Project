

// ----FINAL WORKING CODE FOR NEWS FIRST ----------------------

const catchAsync = require("../utils/catchAsync");
const puppeteer = require('puppeteer');
// const ScrapedArticle = require("../models/scrapedArticleModel")
// const ScrapedArticle = require("../models/scrapedArticleModel");
const ScrapedArticle = require("../models/scrapedArticleModel");



// exports.scrapeNewsFirst = catchAsync(async (req, res, next) => {
//     console.log("route is called....", req.query);
//     try {
//         const browser = await puppeteer.launch();

//         const page = await browser.newPage();
//         await page.setViewport({ width: 1600, height: 1000, isMobile: false, isLandscape: true, hasTouch: false, deviceScaleFactor: 1 });

//         await page.goto("https://english.newsfirst.lk/latest");

//         // Wait for the selector to be available
//         await page.waitForSelector(".local_news_main div .ng-star-inserted");

//         // Extracting titles and URLs
//         const data = await page.evaluate(async () => {
//             const elements = document.querySelectorAll(".local_news_main div .ng-star-inserted");
//             const extractedData = [];
//             for (const element of elements) {
//                 const titleElement = element.querySelector('a');
//                 if (titleElement) {
//                     const title = titleElement.textContent.trim();
//                     const url = titleElement.getAttribute('href');
//                     try {
//                         // Open link in a new tab
//                         const newPage = await window.open(url, '_blank');
//                         await new Promise(resolve => newPage.onload = resolve); // Wait for the new tab to load
//                         // Get the title from the new tab
//                         const pageTitleElement = newPage.document.querySelector("h1.top_stories_header_news");
//                         if (pageTitleElement) {
//                             const pageTitle = pageTitleElement.textContent.trim();
//                             // Get the author name, date, and time from the new tab
//                             const authorElement = newPage.document.querySelector(".author_main");
//                             if (authorElement) {
//                                 const authorInfo = authorElement.textContent.trim().split(' ');
//                                 const authorName = `${authorInfo[0]} ${authorInfo[1]} ${authorInfo[2]}`; // Take first 3 words as author name
//                                 const [datePart, timePart] = authorInfo.slice(3).join(' ').split('|');
//                                 const date = datePart ? datePart.trim() : '';
//                                 const time = timePart ? timePart.trim() : '';
//                                 // Get the body text
//                                 const bodyElement = newPage.document.querySelector("#testId");
//                                 const body = bodyElement ? bodyElement.textContent.trim() : '';
//                                 extractedData.push({ title: pageTitle, author: authorName, date, time, body });
//                             }
//                         }
//                         newPage.close(); // Close the new tab
//                     } catch (error) {
//                         console.error("Error navigating to:", url);
//                     }
//                 }
//             }
//             return extractedData;
//         });

//         await browser.close();

//         for (const item of data) {
//             try {
//                 let tempTitle = await ScrapedArticle.findOne({ articleTitle: item.title });
//                 if (!tempTitle) {
//                     await ScrapedArticle.create({
//                         articleTitle: item.title,
//                         content: item.body,
//                         author: item.author,
//                         datePublish: item.date,
//                         time: item.time,
//                         publisher: "newsFirst"
//                     });
//                 } else {
//                     console.log("Article already in the database...", tempTitle.title);
//                 }
//             } catch (error) {
//                 console.error("Error saving scraped data to database:", error);
//             }
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }finally{
//         next()
//     }

//     if (req.params?.all) {
//         next();
//     } else {
//         res.status(200).json({
//             message: "success"
//         });
//     }
// });


exports.scrapeNewsFirst = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.query);
    try {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000, isMobile: false, isLandscape: true, hasTouch: false, deviceScaleFactor: 1 });

        await page.goto("https://english.newsfirst.lk/latest");

        // Wait for the selector to be available
        await page.waitForSelector(".local_news_main div .ng-star-inserted");

        // Extracting links
        const links = await page.evaluate(() => {
            const elements = document.querySelectorAll(".local_news_main div .ng-star-inserted");
            const extractedLinks = [];
            for (const element of elements) {
                const titleElement = element.querySelector('a');
                if (titleElement) {
                    const url = titleElement.getAttribute('href');
                    extractedLinks.push(url);
                }
            }
            return extractedLinks;
        });

        await browser.close();

   
        const newBrowser = await puppeteer.launch();
        for (const url of links) {
            try {
                const existingArticle = await ScrapedArticle.findOne({ articleUrl: url });
                if (existingArticle) {
                    console.log("Article already in the database:", existingArticle.articleTitle);
                    skip; // Skip if article already exists
                }


                const newPage = await newBrowser.newPage();
                await newPage.goto(url);

                const pageTitle = await newPage.$eval("h1.top_stories_header_news", element => element.textContent.trim());
                const authorInfo = await newPage.$eval(".author_main", element => element.textContent.trim().split(' '));
                const authorName = `${authorInfo[0]} ${authorInfo[1]} ${authorInfo[2]}`;
                const [datePart, timePart] = authorInfo.slice(3).join(' ').split('|');
                const date = datePart ? datePart.trim() : '';
                const time = timePart ? timePart.trim() : '';
                const body = await newPage.$eval("#testId", element => element.textContent.trim());

               

                await ScrapedArticle.create({
                    articleTitle: pageTitle,
                    articleUrl: url,
                    content: body,
                    author: authorName,
                    datePublish: date,
                    time: time,
                    publisher: "newsFirst"
                });

              await newPage.close()
            } catch (error) {
                console.error("Error scraping data for link:", url, error);
            }
        }

        await newBrowser.close();

        console.log("Scraped links:", scrapedLinks);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        if (req.params?.all) {
            next();
        } else {
            res.status(200).json({
                message: "success"
            });
        }
    }
});


// =======================================

exports.scrapeAdaDerana = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.params?.all);
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 60 seconds
        await page.setDefaultNavigationTimeout(60000);

        await page.goto("https://www.adaderana.lk/hot-news/");

        // Wait for the selector to be available
        await page.waitForSelector(".col-xs-12.col-sm-8.col-lg-7");

        // Extracting titles and URLs
        const data = await page.evaluate(() => {
            const elements = document.querySelectorAll(".col-xs-12.col-sm-8.col-lg-7 .news-story");
            const extractedData = [];
            for (const element of elements) {
                const titleElement = element.querySelector('h2 a');
                if (titleElement) {
                    const title = titleElement.textContent.trim();
                    const url = titleElement.getAttribute('href');
                    extractedData.push({ title, url });
                }
            }
            return extractedData;
        });

        const scrapedData = [];

        // Open each news story link in a new tab and scrape its content
        for (const item of data) {
            try {
                const newPage = await browser.newPage();
                // Retry navigation on timeout
                await Promise.race([
                    newPage.goto(item.url, { waitUntil: 'domcontentloaded' }),
                    new Promise((resolve, reject) => setTimeout(reject, 60000))
                ]);

                const content = await newPage.evaluate(() => {
                    const title = document.querySelector("article.news h1").textContent.trim();
                    const date = document.querySelector("article.news .news-datestamp").textContent.trim();
                    const body = document.querySelector("article.news .news-content").textContent.trim();
                    return { title, date, body };
                });

                scrapedData.push({
                    title: content.title,
                    date: content.date.split("\t\t")[0],
                    time: content.date.split("\t\t")[1],
                    body: content.body
                });

                await newPage.close();
            } catch (error) {
                console.error("Error navigating to:", item.url);
                // Continue to the next link
                continue;
            }
        }

        await browser.close();

        for (const item of scrapedData) {
            try {
                let tempTitle = await ScrapedArticle.findOne({ articleTitle: item.title });
                            
                if (!tempTitle) {
                    await ScrapedArticle.create({
                        articleTitle: item.title,
                        content: item.body,
                        author: item.author,
                        datePublish: item.date,
                        time: item.time,
                        publisher: "adaderana"
                    });
                } else {
                    console.log("Article already in the database...", tempTitle.title);
                }
            } catch (error) {
                console.error("Error saving scraped data to database:", error);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }finally{
        next()
    }

    console.log("Going to check the query...");

    if (req.query.all == "all") {
        console.log("Next is about to be called...");
        next();
    } else {
        res.status(200).json({
            message: "success"
        });
    }
});



exports.scrapeBBC = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.params?.all)
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 120 seconds
        await page.setDefaultNavigationTimeout(120000);

        await page.goto("https://www.bbc.com/news");

        // Wait for the selector to be available
        await page.waitForSelector("#main-content > div:nth-child(4) > div > div > div.ssrcss-bz7v5r-HierachichalCollectionsWrapper.eqfxz1e3 > ul");

        // Extracting links
        const links = await page.evaluate(() => {
            const elements = document.querySelectorAll("#main-content > div:nth-child(4) > div > div > div.ssrcss-bz7v5r-HierachichalCollectionsWrapper.eqfxz1e3 > ul > li > div > div > div > div.ssrcss-tq7xfh-PromoContent.exn3ah99 > div.ssrcss-1f3bvyz-Stack.e1y4nx260 > a.ssrcss-1mrs5ns-PromoLink.exn3ah91");
            const urls = [];
            elements.forEach(element => {
                urls.push(element.href);
            });
            return urls;
        });

        const scrapedData = [];

        // Iterate through each link and scrape data
        for (const link of links) {
            try {
                const newPage = await browser.newPage();
                // Retry navigation on timeout
                await Promise.race([
                    newPage.goto(link, { waitUntil: 'domcontentloaded' }),
                    new Promise((resolve, reject) => setTimeout(reject, 120000)) // Adjusted timeout
                ]);

                // Scrape data from each page
                const content = await newPage.evaluate(() => {
                    const titleElement = document.querySelector("h1#main-heading");
                    const imageElement = document.querySelector('.ssrcss-1y79c70-ComponentWrapper.ep2nwvo1 img');
                    const authorElement = document.querySelector(".ssrcss-68pt20-Text-TextContributorName .e8mq1e96");
                    const paragraphElements = document.querySelectorAll('.ssrcss-11r1m41-RichTextComponentWrapper.ep2nwvo0 p.ssrcss-1q0x1qg-Paragraph');
                    let concatenated = '';
                    paragraphElements.forEach((element, index) => {
                      concatenated += element.textContent.trim();
                      if (index < paragraphElements.length - 1) {
                        concatenated += '\n';
                      }
                    });
                    const dateElement = document.querySelector(".ssrcss-1if1g9v-MetadataText time");

                    const title = titleElement ? titleElement.textContent.trim() : "";
                    const author = authorElement ? authorElement.textContent.trim() : "";
                    const body = concatenated;
                    const date = dateElement ? dateElement.getAttribute('datetime').split("T")[0] : "";
                    const time = dateElement ? dateElement.getAttribute('datetime').split("T")[1] : "";
                    const image = imageElement ? imageElement.src : null;

                    return { title, author, body, date, time, image };
                });

                scrapedData.push(content);

                await newPage.close();
            } catch (error) {
                console.error("Error navigating to:", link, error);
                // Continue to the next link
                continue;
            }
        }

        await browser.close();

        for (const item of scrapedData) {
            try {
                let tempTitle = await ScrapedArticle.findOne({ articleTitle: item.title });

                if (!tempTitle) {
                    await ScrapedArticle.create({ articleTitle: item.title, content: item.body, author: item.author, datePublish: item.date, time: item.time, publisher: "bbc" });
                } else {
                    console.log("article already in the database...", tempTitle.title)
                }
            } catch (error) {
                console.error("Error saving scraped data to database:", error);
            }
        }

        if (req.query?.all == "all") {
            console.log("next is about to be called...")
            next()
        } else {
            res.status(200).json({
                message: "success"
            })
        }
    } catch (error) {
        console.error("Error:", error);
    }finally{
        next()
    }
});


exports.scrapeTheSun = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.params?.all)
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 120 seconds
        await page.setDefaultNavigationTimeout(120000);

        await page.goto("https://www.thesun.co.uk/news/");

        // Wait for the selector to be available
        await page.waitForSelector("#customiser-v2-12581172 > div:nth-child(2) > div");

        // Extracting links
        const links = await page.evaluate(() => {
            const elements = document.querySelectorAll(".col.sun-col-2 .teaser-item a");
            const urls = [];
            elements.forEach(element => {
                urls.push(element.href);
            });
            return urls;
        });

        const scrapedData = [];

        // Iterate through each link and scrape data
        for (const link of links) {
            try {
                const newPage = await browser.newPage();
                // Retry navigation on timeout
                await Promise.race([
                    newPage.goto(link, { waitUntil: 'domcontentloaded' }),
                    new Promise((resolve, reject) => setTimeout(reject, 120000)) // Adjusted timeout
                ]);

                // Scrape data from each page
                const content = await newPage.evaluate(() => {
                    const titleElement = document.querySelector("h1.article__headline");
                    const imageElement = document.querySelector('picture.article-top-mobile__image img');
                    const authorElement = document.querySelector("div.article__author a.article__author-link");
                    const paragraphElements = document.querySelectorAll('#main-content > section > div > main > article > div.article__content p');
                    let concatenated = '';
                    paragraphElements.forEach((element, index) => {
                        concatenated += element.textContent.trim();
                        if (index < paragraphElements.length - 1) {
                            concatenated += '\n';
                        }
                    });
                    const dateElement = document.querySelector("li.article__updated time");

                    const title = titleElement ? titleElement.textContent.trim() : "";
                    const author = authorElement ? authorElement.textContent.trim() : "";
                    const body = concatenated;
                    const date = dateElement ? dateElement.getAttribute('datetime').split("T")[0] : "";
                    const time = dateElement ? dateElement.getAttribute('datetime').split("T")[1] : "";
                    const image = imageElement ? imageElement.src : null;

                    return { title, author, body, date, time, image };
                });

                scrapedData.push(content);

                await newPage.close();
            } catch (error) {
                console.error("Error navigating to:", link, error);
                // Continue to the next link
                continue;
            }
        }

        await browser.close();

        for (const item of scrapedData) {
            try {
                let tempTitle = await ScrapedArticle.findOne({ articleTitle: item.title });

                if (!tempTitle) {
                    await ScrapedArticle.create({ articleTitle: item.title, content: item.body, author: item.author, datePublish: item.date, time: item.time, publisher: "thesun" });
                } else {
                    console.log("article already in the database...", tempTitle.title)
                }
            } catch (error) {
                console.error("Error saving scraped data to database:", error);
            }
        }

        if (req.query?.all == "all") {
            console.log("next is about to be called...")
            next()
        } else {
            res.status(200).json({
                message: "success"
            })
        }
    } catch (error) {
        console.error("Error:", error);
    }finally{
        next()
    }
});



exports.scrapeHindustanTimes = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.params?.all)
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 120 seconds
        await page.setDefaultNavigationTimeout(120000);

        await page.goto("https://www.hindustantimes.com/latest-news");

        // Wait for the selector to be available
        await page.waitForSelector("body > section.container > section");

        // Extracting links
        const links = await page.evaluate(() => {
            const elements = document.querySelectorAll(".cartHolder.listView.track.timeAgo.articleClick h3 a");
            const urls = [];
            elements.forEach(element => {
                urls.push(element.href);
            });
            return urls;
        });

        const scrapedData = [];

        // Iterate through each link and scrape data
        for (const link of links) {
            try {
                const newPage = await browser.newPage();
                // Retry navigation on timeout
                await Promise.race([
                    newPage.goto(link, { waitUntil: 'domcontentloaded' }),
                    new Promise((resolve, reject) => setTimeout(reject, 120000)) // Adjusted timeout
                ]);

                // Scrape data from each page
                const content = await newPage.evaluate(() => {
                    const titleElement = document.querySelector("h1.hdg1");
                    const imageElement = document.querySelector('.storyParagraphFigure picture img');
                    const authorElement = document.querySelector(".storyShortDetail .storyBy small.byLineAuthor a");
                    const paragraphElements = document.querySelectorAll('div.storyDetails > div.detail > p');
                    let concatenated = '';
                    paragraphElements.forEach((element, index) => {
                        concatenated += element.textContent.trim();
                        if (index < paragraphElements.length - 1) {
                            concatenated += '\n';
                        }
                    });
                    const dateElement = document.querySelector(".dateTime.secTime.storyPage");

                    const title = titleElement ? titleElement.textContent.trim() : "";
                    const author = authorElement ? authorElement.textContent.trim() : "";
                    const body = concatenated;
                    const dateTimeParts = dateElement.textContent.trim().split(' ');
                    const date = ""; 
                    const time = dateTimeParts.slice(3).join(' ');
                    const image = imageElement ? imageElement.src : null;

                    return { title, author, body, date, time, image };
                });

                scrapedData.push(content);

                await newPage.close();
            } catch (error) {
                console.error("Error navigating to:", link, error);
                // Continue to the next link
                continue;
            }
        }

        await browser.close();

        for (const item of scrapedData) {
            try {
                let tempTitle = await ScrapedArticle.findOne({ articleTitle: item.title });

                if (!tempTitle) {
                    await ScrapedArticle.create({ articleTitle: item.title, content: item.body, author: item.author, datePublish: item.date, time: item.time, publisher: "hindustantimes" });
                }

                if (tempTitle) {
                    console.log("article already in the database...", tempTitle.title)
                }
            } catch (error) {
                console.error("Error saving scraped data to database:", error);
            }
        }

        if (req.query?.all == "all") {
            console.log("next is about to be called...")
            next()
        } else {
            res.status(200).json({
                message: "success"
            })
        }
    } catch (error) {
        console.error("Error:", error);
    }finally{
        next()
    }
});






exports.scrapeNikkei = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.params?.all);
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 120 seconds
        await page.setDefaultNavigationTimeout(120000);

        await page.goto("https://asia.nikkei.com/Location");

        // Wait for the selector to be available
        await page.waitForSelector("#article-stream");

        // Extracting links
        const links = await page.evaluate(() => {
            const elements = document.querySelectorAll(".card-article__headline a");
            const urls = [];
            elements.forEach(element => {
                urls.push(element.href);
            });
            return urls;
        });

        const scrapedData = [];

        // Iterate through each link and scrape data
        for (const link of links) {
            try {
                const newPage = await browser.newPage();
                // Retry navigation on timeout
                await Promise.race([
                    newPage.goto(link, { waitUntil: 'domcontentloaded' }),
                    new Promise((resolve, reject) => setTimeout(reject, 120000)) // Adjusted timeout
                ]);

                // Scrape data from each page
                const content = await newPage.evaluate(() => {
                    const titleElement = document.querySelector("h1.article-header__title > span.ezstring-field");
                    const imageElement = document.querySelector('[data-trackable="image-main"] img');
                    const authorElement = document.querySelector("div.article__author > span.ezstring-field");
                    const paragraphElements = document.querySelectorAll('div.ezrichtext-field > p');

                    let concatenated = '';
                    paragraphElements.forEach((element, index) => {
                        concatenated += element.textContent.trim();
                        if (index < paragraphElements.length - 1) {
                            concatenated += '\n';
                        }
                    });

                    const dateElement = document.querySelector("time.timestamp__time");

                    const title = titleElement ? titleElement.textContent.trim() : "";
                    const author = authorElement ? authorElement.textContent.trim() : "";
                    const body = concatenated;
                    const dateTimeParts = dateElement.textContent.trim().split(' ');
                    const date = dateTimeParts.slice(0, 3).join(' ');
                    const time = dateTimeParts.slice(3).join(' ');
                    const image = imageElement ? imageElement.getAttribute('full') : null;

                    return { title, author, body, date, time, image };
                });

                scrapedData.push(content);

                await newPage.close();
            } catch (error) {
                console.error("Error navigating to:", link, error);
                // Continue to the next link
            }
        }

        await browser.close();

        // Save scraped data to database
        for (const item of scrapedData) {
            try {
                let tempTitle = await ScrapedArticle.findOne({ articleTitle: item.title });
                if (!tempTitle) {
                    await ScrapedArticle.create({
                        articleTitle: item.title,
                        content: item.body,
                        author: item.author,
                        datePublish: item.date,
                        time: item.time,
                        publisher: "nikkei"
                    });
                } else {
                    console.log("Article already in the database...", tempTitle.title);
                }
            } catch (error) {
                console.error("Error saving scraped data to database:", error);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }finally{
        next()
    }

    if (req.query?.all === "all") {
        next();
    } else {
        res.status(200).json({
            message: "success"
        });
    }
});
