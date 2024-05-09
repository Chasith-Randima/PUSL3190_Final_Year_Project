const mongoose = require("mongoose");
const slugify = require("slugify");

// Article schema

const articleSchema = new mongoose.Schema(
  {
    title:{
        type:String,
    },
    summary:{
        type:String
    },
    datePublish:{
        type:Date
    },
    timePublish:{
        type:String
    },
    author:{
        type:String
    },
    images: [String],
    description: String,
    scrapedTime:{
        type:String
    },
    comments:[String],
    likes:{
        type:Number
    },
    scrapedArticleId:{
        type:String,
    },
    scrapedArticleLink:{
        type:String
    },
    publisher:{
        type:String
    },
    customFetch:{
      type:String
    },
    url:{
      type:String
    },
    summarized_text:{
      type:String,
    },
    original_text:{
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
//   { timestamps: true }
  // { typeKey: "$type" }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;