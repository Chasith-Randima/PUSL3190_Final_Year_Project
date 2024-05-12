const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();


// const userRouter = require("./routes/userRoute");
// const scrapedArticlesRouter = require("./routes/scrapedArticleRoute");
// const articleRouter = require("./routes/articleRoute");
// const postRouter = require("./routes/postRoute");
// const commentRouter = require("./routes/commentRoute");
// const websiteRouter = require("./routes/websiteRoute");
const scrapeRouter = require("./routes/scrapeRoute");
const newScrapeRouter = require("./routes/newScrapeRoute");

// var cron = require('node-cron');

// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });

app.use(express.json({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}



// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/scrapedArticles", scrapedArticlesRouter);
// app.use("/api/v1/articles", articleRouter);
// app.use("/api/v1/posts", postRouter);
// app.use("/api/v1/comments", commentRouter);
// app.use("/api/v1/websites", websiteRouter);
app.use("/api/v1/scrapes", scrapeRouter);
app.use("/api/v1/newscrapes", newScrapeRouter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

module.exports = app;