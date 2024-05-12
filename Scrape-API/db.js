const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

mongoose.set("strictQuery", false);

const connect = ()=>{ mongoose
  .connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull...");
  });

}

module.exports = connect;