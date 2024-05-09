const mongoose = require("mongoose");
const slugify = require("slugify");

// Post schema

const postSchema = new mongoose.Schema(
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
    author:{
        type:String
    },
    images: [String],
    description: String,
    fetchedTime:{
        type:String
    },
    comments:[String],
    likes:{
        type:Number
    },
    scrapedPostId:{
        type:String,
    },
    scrapedPostLink:{
        type:String
    },
    customFetch:{
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

const Post = mongoose.model("Post", postSchema);

module.exports = Post;