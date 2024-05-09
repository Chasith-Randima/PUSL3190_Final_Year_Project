const mongoose = require("mongoose");
const slugify = require("slugify");

// Website schema

const websiteSchema = new mongoose.Schema(
  {
    name:{
        type:String
    },
    link:{
        type:String
    },
    tag:{
        type:String
    }
  },
  { timestamps: true }
  // { typeKey: "$type" }
);

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;