const mongoose = require("mongoose");
const slugify = require("slugify");

// ScrapedArticle schema

const scrapedArticleSchema = new mongoose.Schema(
  {
    articleTitle:{
        type:String,
    },
    summarized:{
      type:Boolean
    },
    content:{
        type:String
    },
    datePublish:{
        type:Date
    },
    time:{
      type:String
    },
    author:{
        type:String
    },
    publisher:{
      type:String
    },
    articleUrl:{
      type:String
    },
    images: [String],
    description: String,
    customFetch:{
      type:String
    },
    url:{
      type:String
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
  // { typeKey: "$type" }
);

const ScrapedArticle = mongoose.model("ScrapedArticle", scrapedArticleSchema);

module.exports = ScrapedArticle;