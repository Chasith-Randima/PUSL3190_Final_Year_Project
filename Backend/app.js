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


// function to send request to scrape api
var cron = require('node-cron');

const scrapeArticles = ()=>{

  //accessing scrape api url from environment variables
  const API = process.env.NEXT_PUBLIC_SCRAPE_API_DEVELOPMENT;
  const url = `${API}/scrapes`;

  // setting required parameters
  const paramsData = {
    all:"all"
  };

  const queryString = new URLSearchParams(paramsData).toString();
  const fullUrl = `${url}?${queryString}`;

  // sending request via in build fetch package
  try {
   fetch(fullUrl);
  //  catching errors and console logging them
  } catch (error) {
    console.error('Fetch error:', error);
    
  }
}

// running crone job and calling the function inside it every hour
cron.schedule('1 * * * *', () => {
 scrapeArticles()
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;