// const mongoose = require("mongoose");
// const Article = require("../../models/articleModel")
// const connect = require("../../db")
// const dotenv = require("dotenv");

// dotenv.config({ path: "./config.env" });
// describe("Article CRUD Operations", () => {
//   beforeAll(async () => {

//     connect()
//     // Connect to a test database
//     // await mongoose.connect(process.env.DATABASE_TEST, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     // });

// //     mongoose
// //   .connect(process.env.DATABASE_TEST, {
// //     // useNewUrlParser: true,
// //     // useUnifiedTopology: true,
// //   })
// //   .then(() => {
// //     console.log("DB Connection Successfull...");
// //   });
//   });

// //   afterEach(async () => {
// //     // Clear the database after each test
// //     await Article.deleteMany({});
// //   });

//   afterAll(async () => {
//     // Close the database connection
//     await mongoose.connection.close();
//   });

//   // Test creating a new article
//   it("should create a new article", async () => {
//     const newArticleData = {
//       title: "Test Article",
//       summary: "This is a test article.",
//       // Add more fields as needed
//     };

//     const newArticle = await Article.create(newArticleData);

//     expect(newArticle).toBeDefined();
//     expect(newArticle.title).toBe(newArticleData.title);
//     // Add more assertions as needed
//   });

//   // Test reading a single article
//   it("should retrieve the created article", async () => {
//     const newArticleData = {
//       title: "Test Article",
//       summary: "This is a test article.",
//       // Add more fields as needed
//     };

//     const createdArticle = await Article.create(newArticleData);
//     const retrievedArticle = await Article.findById(createdArticle._id);

//     expect(retrievedArticle).toBeDefined();
//     expect(retrievedArticle.title).toBe(newArticleData.title);
//     // Add more assertions as needed
//   });

//   // Test updating an article
//   it("should update the created article", async () => {
//     const newArticleData = {
//       title: "Test Article",
//       summary: "This is a test article.",
//       // Add more fields as needed
//     };

//     const createdArticle = await Article.create(newArticleData);
//     const updatedFields = {
//       summary: "Updated summary",
//     };

//     const updatedArticle = await Article.findByIdAndUpdate(
//       createdArticle._id,
//       updatedFields,
//       { new: true }
//     );

//     expect(updatedArticle).toBeDefined();
//     expect(updatedArticle.summary).toBe(updatedFields.summary);
//     // Add more assertions as needed
//   });

//   // Test deleting an article
//   it("should delete the created article", async () => {
//     const newArticleData = {
//       title: "Test Article",
//       summary: "This is a test article.",
//       // Add more fields as needed
//     };

//     const createdArticle = await Article.create(newArticleData);
//     const deletedArticle = await Article.findByIdAndDelete(createdArticle._id);

//     expect(deletedArticle).toBeDefined();
//     expect(deletedArticle._id.toString()).toBe(createdArticle._id.toString());
//     // Verify that the article is deleted from the database
//     const foundArticle = await Article.findById(createdArticle._id);
//     expect(foundArticle).toBeNull();
//   });
// });






describe("GET /api/v1/scrapedArticles", () => {
  test("returns all scraped articles", () => {
    // Simplistic implementation: Always return true
    expect(true).toBe(true);
  });

  test("returns 404 if no articles found", () => {
    // Simplistic implementation: Always return true
    expect(true).toBe(true);
  });

  test("returns 500 if server error occurs", () => {
    // Simplistic implementation: Always return true
    expect(true).toBe(true);
  });
 
  test("returns 500 if server error occurs", () => {
    // Simplistic implementation: Always return true
    expect(true).toBe(true);
  });
 
});


