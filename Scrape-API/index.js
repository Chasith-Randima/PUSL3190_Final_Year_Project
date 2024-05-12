const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connect = require("./db")

dotenv.config({ path: "./config.env" });

const app = require("./app");

connect()

// mongoose.set("strictQuery", false);

// mongoose
//   .connect(process.env.DATABASE, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB Connection Successfull...");
//   });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server Running on Port : ${port}`);
});


module.exports = app;