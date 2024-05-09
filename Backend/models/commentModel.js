const mongoose = require("mongoose");
const slugify = require("slugify");

// Comment schema

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    article: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Article",
      },
    ],
  },
  { timestamps: true }
  // { typeKey: "$type" }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v -passwordChangedAt -password ",
  });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;