const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const axios = require("axios")


const app = express();


const userRouter = require("./routes/userRoute");
const scrapedArticlesRouter = require("./routes/scrapedArticleRoute");
const articleRouter = require("./routes/articleRoute");
const postRouter = require("./routes/postRoute");
const commentRouter = require("./routes/commentRoute");
const websiteRouter = require("./routes/websiteRoute");
const scrapeRouter = require("./routes/scrapeRoute");
const newScrapeRouter = require("./routes/newScrapeRoute");

app.use(express.json({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}



app.use("/api/v1/users", userRouter);
app.use("/api/v1/scrapedArticles", scrapedArticlesRouter);
app.use("/api/v1/articles", articleRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/websites", websiteRouter);
app.use("/api/v1/scrapes", scrapeRouter);
app.use("/api/v1/newscrapes", newScrapeRouter);

var cron = require('node-cron');

const scrapeArticles = ()=>{

  const API = process.env.NEXT_PUBLIC_SCRAPE_API_DEVELOPMENT;
  const url = `${API}/scrapes`;

  const paramsData = {
    all:"all"
    // page: 1,
    // limit: 10,
    // category: 'some_category',
    // brandName: 'some_brand',
    // price: 100,
    // quantity: 50,
    // sort: 'ascending'
    // Add more parameters as needed
  };

  const queryString = new URLSearchParams(paramsData).toString();
  const fullUrl = `${url}?${queryString}`;

  try {
   fetch(fullUrl);
    
   
  } catch (error) {
    console.error('Fetch error:', error);
    
  }


  // let API = process.env.NEXT_PUBLIC_SCRAPE_API_DEVELOPMENT
  // let url = `${API}/scrapes`;

  // console.log(url)

  // axios(url, {
  //   method: "GET",
  //   // params: { ...query },
  //   params: {
  //     page: paramsData.page,
  //     limit: paramsData.limit,
  //     category: paramsData.category,
  //     brandName: paramsData.brand,
  //     "price[lte]": paramsData.price,
  //     "quantity[lte]": paramsData.quantity,
  //      all:"all",
  //     // createdAt: paramsData.createdAt,

  //     //   name: paramsData.name,
  //     //   city: paramsData.city,
  //     //   brandname: paramsData.brandname,
  //     //   Article: paramsData.Article,
  //     //   "price[gte]": paramsData.priceMin,

  //     sort: paramsData.sort,
  //   },
  // })
  //   .then((response) => {
  //     console.log(response.data);
  //     return response.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return err;
  //   });


}

cron.schedule('* * * * *', () => {
  console.log("iam called")
 scrapeArticles()
 
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;