

// ----FINAL WORKING CODE FOR NEWS FIRST ----------------------

const catchAsync = require("../utils/catchAsync");
const puppeteer = require('puppeteer');
// const ScrapedArticle = require("../models/scrapedArticleModel")
// const ScrapedArticle = require("../models/scrapedArticleModel");
const ScrapedArticle = require("../models/scrapedArticleModel");
const Article = require("../models/articleModel");
const fetch = require("isomorphic-fetch");

let API = process.env.SUMMARIZER_API_DEVELOPMENT;

// =======================================

function formatBodyText(body) {
    // Replace double quotes with single quotes
    let formattedBody = body.replace(/"/g, "'");
    
    // Remove blank lines
    formattedBody = formattedBody.split('\n').filter(line => line.trim() !== '').join(' ');
    
    return formattedBody;
}

// exports.scrapeOneNewsFirst = catchAsync(async (req, res, next) => {
//     console.log("route is called news first one....", req.body);

//     const link = req.body.link; // Extract the link from the request body

//     if (!link) {
//         return res.status(400).json({ message: "No link provided" });
//     }

//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.setViewport({ width: 1600, height: 1000, isMobile: false, isLandscape: true, hasTouch: false, deviceScaleFactor: 1 });
//         await page.goto(link);

//         // Wait for the selector to be available
//         // await page.waitForSelector(".local_news_main div .ng-star-inserted");

//         // await new Promise(resolve => page.onload = resolve); // Wait for the new tab to load
//         // Scrape data based on selectors
//         const data = await page.evaluate(() => {
//             const titleElement = document.querySelector("h1.top_stories_header_news");
//             const authorElement = document.querySelector(".author_main");
//             const bodyElement = document.querySelector("#testId");

//             const title = titleElement ? titleElement.textContent.trim() : '';
//             const author = authorElement ? authorElement.textContent.trim() : '';
//             const body = bodyElement ? bodyElement.textContent.trim() : '';

//             return { title, author, body };
//         });

//         await browser.close();

//         // Save the scraped data. This is a placeholder for your save logic.
//         // await saveScrapedData(data);

//         console.log("Scraped data:", data);

//         // Fetch call to a specified endpoint
//         const fetchResponse = await fetch("http://127.0.0.1:3005/bart", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ content: data.body })
//         });

//         if (!fetchResponse.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const responseData = await fetchResponse.json();
//         console.log("Fetch response data:", responseData);

//         res.status(200).json({ message: "success", data: responseData });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ message: "Internal server error", error: error.toString() });
//     }
// })

// exports.scrapeOne = catchAsync(async (req, res, next) => {
//     console.log("one route is called....", req.query);


//     let body = {content:"A mural painted by street artist Banksy on a residential building in north London has been defaced. The artwork appeared over the weekend featuring swathes of green paint on a wall behind a nearby tree to give the appearance of leaves. But by Wednesday morning, the artwork, surrounded by a protective metal fence, had been strewn with white paint. Islington Council said it was installing CCTV cameras and looking at other ways to protect the work. A spokesperson said the authority welcomed the piece, adding: 'We very much want it to stay.' They added: 'This is a really powerful piece, which highlights the vital role that trees play in our communities and in tackling the climate emergency. It's sad to see the piece has been defaced.' When the mural first appeared, 'we moved quickly to put in place temporary measures to protect it and manage the crowds, such as installing fencing and having visits from park patrol officers'. The council was discussing 'future solutions' with the homeowner 'to enable everyone to enjoy the artwork'. On Monday, Banksy claimed the mural as his own following speculation after it appeared on a building on Hornsey Road in Finsbury Park. 'Real shame' Streams of people travelled to see the artwork, but local resident Matt McKenna, 35, told BBC London he was out walking his dog on Wednesday morning when he saw the white paint across the mural. 'It is a real shame. It happened overnight,' he said. 'When it appeared on Sunday my partner saw it and said she quite liked it before everyone was talking about it. 'It has got lots of people talking and it is a bit of London which is a bit forgotten at times.' As yet, the person responsible for the white paint has not been identified. Speaking on the BBC podcast 'The Banksy Story' earlier in the week, graffiti artist Joe Epstein, from LDN Graffiti, explained graffiti artists often had 'turf wars' that could see them 'taking out each other's pieces'. He said: 'Part of the story of these pieces is how people add to it or are aggressive towards it or aligned with it.' As with many of Banksy's works, the latest piece caused a debate and range of opinions, including from some conservation campaigners who say the tree was pruned back, or pollarded, too much. The local authority explained the cherry tree chosen by Banksy was 40-50 years old and in declining health, with decay and fungi damage. The council has said it will continue to work to try and keep the tree alive and that it should re-bud across its crown. The boss of the firm responsible for pruning the tree back to its current shape on behalf of the council said his team had used an 'ancient form of pruning', known as pollarding, where the upper parts of the tree were removed. Lawrence-Thor Stephen, who runs Thor's Trees, explained the practice limited the tree's growth and stopped weak branches from falling off. He said it was a 'really good way of increasing the lifespan of the tree' and that he hoped it would 'burst with growth in the spring'."}

//     fetch("http://127.0.0.1:3005/bart", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//             // Accept: "application/json",
//             // "Content-Type": "application/json",
//         //   Authorization: `Bearer ${token}`,
//         },
//         // body: {content:item.body},
//         body:JSON.stringify(body)
//       })
//         .then((response) => {
//           return response.json();
//         })
//         .catch((err) => {
//           console.log(err);
//           return err;
//         });

// });
exports.scrapeNewsFirst = catchAsync(async (req, res, next) => {
    console.log("route is called news first....", req.query);
    try {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000, isMobile: false, isLandscape: true, hasTouch: false, deviceScaleFactor: 1 });

        await page.goto("https://english.newsfirst.lk/latest");

        // Wait for the selector to be available
        await page.waitForSelector(".local_news_main div .ng-star-inserted");

        // Extracting titles and URLs
        const data = await page.evaluate(async () => {
            const elements = document.querySelectorAll(".local_news_main div .ng-star-inserted");
            const extractedData = [];
            for (const element of elements) {
                const titleElement = element.querySelector('a');
                if (titleElement) {
                    const title = titleElement.textContent.trim();
                    const url = titleElement.getAttribute('href');
                    try {
                        // Open link in a new tab
                        const newPage = await window.open(url, '_blank');
                        await new Promise(resolve => newPage.onload = resolve); // Wait for the new tab to load
                        // Get the title from the new tab
                        const pageTitleElement = newPage.document.querySelector("h1.top_stories_header_news");
                        if (pageTitleElement) {
                            const pageTitle = pageTitleElement.textContent.trim();
                            // Get the author name, date, and time from the new tab
                            const authorElement = newPage.document.querySelector(".author_main");
                            if (authorElement) {
                                const authorInfo = authorElement.textContent.trim().split(' ');
                                const authorName = `${authorInfo[0]} ${authorInfo[1]} ${authorInfo[2]}`; // Take first 3 words as author name
                                const [datePart, timePart] = authorInfo.slice(3).join(' ').split('|');
                                const date = datePart ? datePart.trim() : '';
                                const time = timePart ? timePart.trim() : '';
                                // Get the body text
                                const bodyElement = newPage.document.querySelector("#testId");
                                const body = bodyElement ? bodyElement.textContent.trim() : '';

                                // fetch(`${API}/bart`, {
                                // fetch("http://127.0.0.1:3005/bart", {
                                //     method: "POST",
                                //     headers: {
                                //         // Accept: "application/json",
                                //         // "Content-Type": "application/json",
                                //     //   Authorization: `Bearer ${token}`,
                                //     },
                                //     body: {content:body},
                                //   })
                                //     .then((response) => {
                                //       return response.json();
                                //     })
                                //     .catch((err) => {
                                //       console.log(err);
                                //       return err;
                                //     });
                                extractedData.push({ title: pageTitle, author: authorName, date, time, body ,summarized:"false" });
                            }
                        }
                        newPage.close(); // Close the new tab
                    } catch (error) {
                        console.error("Error navigating to:", url);
                    }
                }
            }
            return extractedData;
        });

        await browser.close();

        for (const item of data) {
            try {
                let tempTitle = await ScrapedArticle.findOne({ articleTitle: item.title });

                 // fetch(`${API}/bart`, {
                    // fetch("http://127.0.0.1:3005/bart", {
           
                        // .then((response) => {
                        //   return response.json();
                        // })
                        // .catch((err) => {
                        //   console.log(err);
                        //   return err;
                        // });
                if (!tempTitle) {
                    fetch("http://127.0.0.1:3005/auto", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                            // Accept: "application/json",
                            // "Content-Type": "application/json",
                        //   Authorization: `Bearer ${token}`,
                        },
                        // body: {content:item.body},
                        body:JSON.stringify({content: formatBodyText(item.body),title:item.title,author:item.author,publisher:"newsFirst",customFetch:"false"})
                      })
                    await ScrapedArticle.create({
                        articleTitle: item.title,
                        content: item.body,
                        author: item.author,
                     
                        time: item.time,
                        publisher: "newsFirst"
                    });
                    // await ScrapedArticle.create({
                    //     articleTitle: item.title,
                    //     content: item.body,
                    //     author: item.author,
                    //     datePublish: item.date,
                    //     time: item.time,
                    //     publisher: "newsFirst"
                    // });
                } else {
                    console.log("Article already in the database...", tempTitle.title);
                }
            } catch (error) {
                console.error("Error saving scraped data to database:", error);
            }
        }

        // fetch("http://127.0.0.1:3005/one", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //         // Accept: "application/json",
        //         // "Content-Type": "application/json",
        //     //   Authorization: `Bearer ${token}`,
        //     },
        //     // body: {content:item.body},
        //     body:JSON.stringify({limit: 5})
        //   })
    } catch (error) {
        console.error("Error:", error);
    }
    // finally{
    //     next()
    // }

    if (req.query?.all) {
        next();
    } else {
        res.status(200).json({
            message: "success"
        });
    }
});


// ====================================


exports.scrapeOneAdaDerana = catchAsync(async (req, res, next) => {
    console.log("route is called single scrape one....");
    const link = req.body.link; // Retrieve the link from the request body

    if (!link) {
        return res.status(400).json({ message: "No link provided" });
    }

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 60 seconds
        await page.setDefaultNavigationTimeout(60000);

        // Navigate directly to the provided link
        await page.goto(link, { waitUntil: 'domcontentloaded' });

        // Wait for the selector to be available and scrape data
        // await page.waitForSelector(".selector-for-content");
        const content = await page.evaluate(() => {
            const title = document.querySelector("article.news h1").textContent.trim();
            const date = document.querySelector("article.news .news-datestamp").textContent.trim();
            const body = document.querySelector("article.news .news-content").textContent.trim();
            
            return { title, date, body };
        });

        await browser.close();

      

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        // // Optionally process the fetch response
        // const responseData = await response.json();
        // console.log("Fetch response data:", responseData);
        let response;

        // Save the scraped data
        let tempTitle = await ScrapedArticle.findOne({ articleTitle: content.title });
        if (!tempTitle) {
            fetch("http://127.0.0.1:3005/auto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                    // Accept: "application/json",
                    // "Content-Type": "application/json",
                //   Authorization: `Bearer ${token}`,
                },
                // body: {content:item.body},
                body:JSON.stringify({content: formatBodyText(content.body),title:content.title,author:"item.author",publisher:"adaderana",customFetch:"true"})
              }).then((res)=>{
                console.log("This is working..")
                // console.log(res.json())
                response = res.json()
              })
            await ScrapedArticle.create({
                articleTitle: content.title,
                content: content.body,
                author: "item.author",
             
                // time: item.time,
                publisher: "adaderana"
            });
            // await ScrapedArticle.create({
            //     articleTitle: item.title,
            //     content: item.body,
            //     author: item.author,
            //     datePublish: item.date,
            //     time: item.time,
            //     publisher: "newsFirst"
            // });
        } else {
            console.log("Article already in the database...", tempTitle.title);
        }
        // if (!tempTitle) {
        //     fetch("http://127.0.0.1:3005/auto", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //             // Accept: "application/json",
        //             // "Content-Type": "application/json",
        //         //   Authorization: `Bearer ${token}`,
        //         },
        //         // body: {content:item.body},
        //         body:JSON.stringify({content: formatBodyText(item.body),title:item.title,
        //             // author:item.author,
        //             date:item.date,
        //             // time:item.time,
        //             // image:item.image,
        //             publisher: "hindustantimes" })
        //       })
        //     await ScrapedArticle.create({
        //         articleTitle: content.title,
        //         content: content.body,
        //         author: "Extracted author if available",
        //         datePublish: content.date,
        //         time: "Extracted time if available",
        //         publisher: "Extracted publisher if available"
        //     });
        // } else {
        //     console.log("Article already in the database...", tempTitle.title);
        // }
        console.log("response before send",response)

        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.toString() });
    } 
    // finally {
    //     next();
    // }
});

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
                    fetch("http://127.0.0.1:3005/auto", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                            // Accept: "application/json",
                            // "Content-Type": "application/json",
                        //   Authorization: `Bearer ${token}`,
                        },
                        // body: {content:item.body},
                        body:JSON.stringify({content: formatBodyText(item.body),title:item.title,
                            // author:item.author,
                            date:item.date,
                            time:item.time,
                            // image:item.image,
                            publisher: "adaderana",customFetch:"false" })
                      })
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
    }
    // finally{
    //     next()
    // }

    console.log("Going to check the query...");

    if (req.query.all == "all") {
        console.log("Next is about to be called...");
        next();
    } 
    // else {
    //     res.status(200).json({
    //         message: "success"
    //     });
    // }
});


// ====================================


// ==============================

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
                    fetch("http://127.0.0.1:3005/auto", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                            // Accept: "application/json",
                            // "Content-Type": "application/json",
                        //   Authorization: `Bearer ${token}`,
                        },
                        // body: {content:item.body},
                        body:JSON.stringify({content: formatBodyText(item.body),title:item.title,author:item.author,date:item.date,time:item.time,image:item.image,publisher: "bbc",customFetch:"false" })
                      })
                    await ScrapedArticle.create({ articleTitle: item.title, content: item.body, author: item.author, datePublish: item.date, time: item.time, publisher: "bbc",customFetch:"false" });
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

// ==============================


// ==================
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

                    // fetch("http://127.0.0.1:3005/auto", {
                    //     method: "POST",
                    //     headers: {
                    //         "Content-Type": "application/json"
                    //         // Accept: "application/json",
                    //         // "Content-Type": "application/json",
                    //     //   Authorization: `Bearer ${token}`,
                    //     },
                    //     // body: {content:item.body},
                    //     body:JSON.stringify({content: formatBodyText(body),title,author,date,time,image})
                    //   })

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

                // await  Article.create({

                //     "original_text": item.body,
                //     "summarized_text": item.body,
                //     // "timestamp": time.time()
                // })

                if (!tempTitle) {

                    fetch("http://127.0.0.1:3005/auto", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                            // Accept: "application/json",
                            // "Content-Type": "application/json",
                        //   Authorization: `Bearer ${token}`,
                        },
                        // body: {content:item.body},
                        body:JSON.stringify({content: formatBodyText(item.body),title:item.title,author:item.author,date:item.date,time:item.time,image:item.image, publisher: "thesun",customFetch:"false" })
                      })
                    await ScrapedArticle.create({ articleTitle: item.title, content: item.body, author: item.author, datePublish: item.date, time: item.time, publisher: "thesun",customFetch:"false" });
                 
                    
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
    }
    // finally{
    //     next()
    // }
});


// ===================


// ---------------HINUDSTAN TIMES ---------------------


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
                    fetch("http://127.0.0.1:3005/auto", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                            // Accept: "application/json",
                            // "Content-Type": "application/json",
                        //   Authorization: `Bearer ${token}`,
                        },
                        // body: {content:item.body},
                        body:JSON.stringify({content: formatBodyText(item.body),title:item.title,author:item.author,date:item.date,time:item.time,image:item.image,publisher: "hindustantimes",customFetch:"false" })
                      })
                    await ScrapedArticle.create({ articleTitle: item.title, content: item.body, author: item.author, datePublish: item.date, time: item.time, publisher: "hindustantimes",customFetch:"false" });
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






// ---------------- NIKKEI ---------------------





// ===============================================

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
                    fetch("http://127.0.0.1:3005/auto", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                            // Accept: "application/json",
                            // "Content-Type": "application/json",
                        //   Authorization: `Bearer ${token}`,
                        },
                        // body: {content:item.body},
                        body:JSON.stringify({content: formatBodyText(item.body),title:item.title,author:item.author,date:item.date,time:item.time,image:item.image,publisher: "nikkei",customFetch:"false" })
                      })
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
    }
    // finally{
    //     next()
    // }

    if (req.query?.all === "all") {
        next();
    } else {
        res.status(200).json({
            message: "success"
        });
    }
});

// ===============================================

















// SINGLE ARTICLE SCRAPE

exports.scrapeOneNewsFirst = catchAsync(async (req, res, next) => {
    console.log("route is called news first....", req.body);
    try {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000, isMobile: false, isLandscape: true, hasTouch: false, deviceScaleFactor: 1 });

        const link = req.body.link; // Assuming the link is provided as a query parameter named 'link'
        
        await page.goto(link);

        // Wait for the necessary elements to be available
        await page.waitForSelector("h1.top_stories_header_news");

        // Extracting details
        const data = await page.evaluate(() => {
            const pageTitleElement = document.querySelector("h1.top_stories_header_news");
            const authorElement = document.querySelector(".author_main");
            const bodyElement = document.querySelector("#testId");

            const title = pageTitleElement ? pageTitleElement.textContent.trim() : '';
            const authorInfo = authorElement ? authorElement.textContent.trim().split(' ') : [];
            const authorName = authorInfo.length >= 3 ? `${authorInfo[0]} ${authorInfo[1]} ${authorInfo[2]}` : '';
            const [datePart, timePart] = authorInfo.slice(3).join(' ').split('|');
            const date = datePart ? datePart.trim() : '';
            const time = timePart ? timePart.trim() : '';
            const body = bodyElement ? bodyElement.textContent.trim() : '';

            return { title, author: authorName, date, time, body, summarized: "false" };
        });

        await browser.close();

        // Send scraped data to the other server
        // try {
        //     const response = await fetch("http://127.0.0.1:3005/auto", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({ 
        //             content: formatBodyText(data.body),
        //             title: data.title,
        //             author: data.author,
        //             publisher: "newsFirst",
        //             customFetch:"true"
        //         })
        //     });

        //     console.log("Data sent successfully:", response.status);
        // } catch (error) {
        //     console.error("Error sending data to the server:", error);
        // }

        // Saving to database
        try {
            const existingArticle = await ScrapedArticle.findOne({ articleTitle: data.title });
            if (!existingArticle) {

                const response = await fetch("http://127.0.0.1:3005/auto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        content: formatBodyText(data.body),
                        title: data.title,
                        author: data.author,
                        publisher: "newsFirst",
                        customFetch:"true"
                    })
                });
    
                console.log("Data sent successfully:", response.status);
                await ScrapedArticle.create({
                    articleTitle: data.title,
                    content: data.body,
                    author: data.author,
                    time: data.time,
                    publisher: "newsFirst",
                    customFetch:"true"
                });

                res.status(200).json({
                    status:"success",
                    message:"success",
                    data:response
                })
            } else {
                console.log("Article already in the database:", existingArticle.title);
                res.status(200).json({
                    status:"success",
                    message:"Article Already in database",
                    // data:response.json()
                })
            }
        } catch (error) {
            console.error("Error saving scraped data to database:", error);
        }

        // Respond to the request
        // if (req.query?.all) {
        //     next();
        // } else {
        //     res.status(200).json({
        //         message: "success"
        //     });
        // }
    } catch (error) {
        console.error("Error:", error);
    }
});


exports.scrapeOneBBC = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.params?.all)
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 120 seconds
        await page.setDefaultNavigationTimeout(120000);

        const link = req.body.link; // Assuming the link is provided as a query parameter named 'link'

        await page.goto(link, { waitUntil: 'domcontentloaded' });

        // Scrape data from the provided link
        const content = await page.evaluate(() => {
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
            console.log(titleElement)

            const title = titleElement ? titleElement.textContent.trim() : "";
            const author = authorElement ? authorElement.textContent.trim() : "";
            const body = concatenated;
            const date = dateElement ? dateElement.getAttribute('datetime').split("T")[0] : "";
            const time = dateElement ? dateElement.getAttribute('datetime').split("T")[1] : "";
            const image = imageElement ? imageElement.src : null;

            return { title, author, body, date, time, image };
        });

        await browser.close();

        // Send scraped data to the other server
        try {

     
            const existingArticle = await ScrapedArticle.findOne({ articleTitle: content.title });
            console.log(content)
            if (!existingArticle) {
                const response = await fetch("http://127.0.0.1:3005/auto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        content: formatBodyText(content.body),
                        title: content.title,
                        author: content.author,
                        date: content.date,
                        time: content.time,
                        image: content.image,
                        publisher: "bbc",
                        customFetch:"true"
                    })
                });
    
                await ScrapedArticle.create({ 
                    articleTitle: content.title,
                    content: content.body,
                    author: content.author,
                    datePublish: content.date,
                    time: content.time,
                    image: content.image,
                    publisher: "bbc",
                    customFetch:"true"
                });

                res.status(200).json({
                    status:"success",
                    message:"success",
                    data:response
                })
            } else {
                console.log("Article already in the database:", existingArticle.title);
                res.status(200).json({
                    status:"success",
                    message:"Article Already in database",
                    // data:response.json()
                })
            }
      

            // console.log("Data sent successfully:", response.status);
        } catch (error) {
            console.error("Error sending data to the server:", error);
        }

        // Save to database
        // try {
          
        // } catch (error) {
        //     console.error("Error saving scraped data to database:", error);
        // }

        // if (req.query?.all == "all") {
        //     console.log("next is about to be called...")
        //     next();
        // } else {
        //     res.status(200).json({
        //         message: "success"
        //     });
        // }
    } catch (error) {
        console.error("Error:", error);
        // next();
    }
});

exports.scrapeOneTheSun = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.params?.all)
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 120 seconds
        await page.setDefaultNavigationTimeout(120000);

        const link = req.body.link; // Assuming the link is provided as a query parameter named 'link'

        await page.goto(link, { waitUntil: 'domcontentloaded' });

        // Scrape data from the provided link
        const content = await page.evaluate(() => {
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

        await browser.close();

        // Send scraped data to the other server
        try {
            const existingArticle = await ScrapedArticle.findOne({ articleTitle: content.title });
            if (!existingArticle) {
                await ScrapedArticle.create({ 
                    articleTitle: content.title,
                    content: content.body,
                    author: content.author,
                    datePublish: content.date,
                    time: content.time,
                    image: content.image,
                    publisher: "thesun",
                    customFetch:"true"
                });
                const response = await fetch("http://127.0.0.1:3005/auto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        content: formatBodyText(content.body),
                        title: content.title,
                        author: content.author,
                        date: content.date,
                        time: content.time,
                        image: content.image,
                        publisher: "thesun",
                        customFetch:"true"
                    })
                });
    
                console.log("Data sent successfully:", response.status);

                res.status(200).json({
                    status:"success",
                    message:"success",
                    data:response
                })
            } else {
                console.log("Article already in the database:", existingArticle.title);
                res.status(200).json({
                    status:"success",
                    message:"Article Already in database",
                    // data:response.json()
                })
            }
      
        } catch (error) {
            console.error("Error sending data to the server:", error);
        }

        // Save to database
        // try {

        // } catch (error) {
        //     console.error("Error saving scraped data to database:", error);
        // }

        // if (req.query?.all == "all") {
        //     console.log("next is about to be called...")
        //     next();
        // } else {
        //     res.status(200).json({
        //         message: "success"
        //     });
        // }
    } catch (error) {
        console.error("Error:", error);
    }
});




exports.scrapeOneHindustanTimes = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.params?.all)
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 120 seconds
        await page.setDefaultNavigationTimeout(120000);

        const link = req.body.link; // Assuming the link is provided as a query parameter named 'link'

        await page.goto(link, { waitUntil: 'domcontentloaded' });

        // Scrape data from the provided link
        const content = await page.evaluate(() => {
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

        await browser.close();

        // Send scraped data to the other server
        try {
            console.log(content)
            const existingArticle = await ScrapedArticle.findOne({ articleTitle: content.title });
            if (!existingArticle) {

                const response = await fetch("http://127.0.0.1:3005/auto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        content: formatBodyText(content.body),
                        title: content.title,
                        author: content.author,
                        date: content.date,
                        time: content.time,
                        image: content.image,
                        publisher: "hindustantimes",
                        customFetch:"true"
                    })
                });
    
                console.log("Data sent successfully:", response.status);
                await ScrapedArticle.create({ 
                    articleTitle: content.title,
                    content: content.body,
                    author: content.author,
                    datePublish: content.date,
                    time: content.time,
                    image: content.image,
                    publisher: "hindustantimes",
                    customFetch:"true"
                });

                console.log("Data sent successfully:", response.status);

                res.status(200).json({
                    status:"success",
                    message:"success",
                    data:response
                })
            } else {
                console.log("Article already in the database:", existingArticle.title);
                // console.log("Article already in the database:", existingArticle.title);
                res.status(200).json({
                    status:"success",
                    message:"Article Already in database",
                    // data:response.json()
                })
            }
 
        } catch (error) {
            console.error("Error sending data to the server:", error);
        }

        // Save to database
        // try {
        //     const existingArticle = await ScrapedArticle.findOne({ articleTitle: content.title });
        //     if (!existingArticle) {
        //         await ScrapedArticle.create({ 
        //             articleTitle: content.title,
        //             content: content.body,
        //             author: content.author,
        //             datePublish: content.date,
        //             time: content.time,
        //             image: content.image,
        //             publisher: "hindustantimes"
        //         });
        //     } else {
        //         console.log("Article already in the database:", existingArticle.title);
        //     }
        // } catch (error) {
        //     console.error("Error saving scraped data to database:", error);
        // }

    //     if (req.query?.all == "all") {
    //         console.log("next is about to be called...")
    //         next();
    //     } else {
    //         res.status(200).json({
    //             message: "success"
    //         });
    //     }
    // } catch (error) {
        console.error("Error:", error);
    } finally {
        next();
    }
});





exports.scrapeOneNikkei = catchAsync(async (req, res, next) => {
    console.log("route is called....", req.params?.all);
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1600, height: 1000 });

        // Increase navigation timeout to 120 seconds
        await page.setDefaultNavigationTimeout(120000);

        const link = req.body.link; // Assuming the link is provided as a query parameter named 'link'

        await page.goto(link, { waitUntil: 'domcontentloaded' });

        // Scrape data from the provided link
        const content = await page.evaluate(() => {
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

        await browser.close();

        // Send scraped data to the other server
        try {
            let tempTitle = await ScrapedArticle.findOne({ articleTitle: content.title });
            if (!tempTitle) {

                const response = await fetch("http://127.0.0.1:3005/auto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ 
                        content: formatBodyText(content.body),
                        title: content.title,
                        author: content.author,
                        date: content.date,
                        time: content.time,
                        image: content.image,
                        publisher: "nikkei",
                        customFetch:"true"
                    })
                });
    
                console.log("Data sent successfully:", response.status);
                await ScrapedArticle.create({
                    articleTitle: content.title,
                    content: content.body,
                    author: content.author,
                    datePublish: content.date,
                    time: content.time,
                    publisher: "nikkei",
                    customFetch:"true"
                });

                res.status(200).json({
                    status:"success",
                    message:"success",
                    data:response
                })
            } else {
                console.log("Article already in the database:", tempTitle.title);
                // console.log("Article already in the database:", existingArticle.title);
                res.status(200).json({
                    status:"success",
                    message:"Article Already in database",
                    // data:response.json()
                })
            }
    
        } catch (error) {
            console.error("Error sending data to the server:", error);
        }

        // Save to database
        // try {
         
        // } catch (error) {
        //     console.error("Error saving scraped data to database:", error);
        // }

        // if (req.query?.all === "all") {
        //     next();
        // } else {
        //     res.status(200).json({
        //         message: "success"
        //     });
        // }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        next();
    }
});
