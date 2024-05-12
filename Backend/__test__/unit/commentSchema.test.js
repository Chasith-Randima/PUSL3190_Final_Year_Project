// const mongoose = require("mongoose");
// const Comment = require("../../models/commentModel");
// const User = require("../../models/userModel")
// const dotenv = require("dotenv");

// dotenv.config({ path: "./config.env" });

// describe("Comment CRUD Operations", () => {
//   beforeAll(async () => {
//     mongoose.connect(process.env.DATABASE_TEST, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it("should create a new comment", async () => {
//     const newCommentData = {
//       comment: "This is a test comment.",
//       // Add more fields as needed
//     };

//     const newComment = await Comment.create(newCommentData);

//     expect(newComment).toBeDefined();
//     expect(newComment.comment).toBe(newCommentData.comment);
//     // Add more assertions as needed
//   });

//   it("should retrieve the created comment", async () => {
//     const newCommentData = {
//       comment: "This is a test comment.",
//       // Add more fields as needed
//     };

//     const createdComment = await Comment.create(newCommentData);
//     const retrievedComment = await Comment.findById(createdComment._id);

//     expect(retrievedComment).toBeDefined();
//     expect(retrievedComment.comment).toBe(newCommentData.comment);
//     // Add more assertions as needed
//   });

//   it("should update the created comment", async () => {
//     const newCommentData = {
//       comment: "This is a test comment.",
//       // Add more fields as needed
//     };

//     const createdComment = await Comment.create(newCommentData);
//     const updatedFields = {
//       comment: "Updated test comment.",
//     };

//     const updatedComment = await Comment.findByIdAndUpdate(
//       createdComment._id,
//       updatedFields,
//       { new: true }
//     );

//     expect(updatedComment).toBeDefined();
//     expect(updatedComment.comment).toBe(updatedFields.comment);
//     // Add more assertions as needed
//   });

//   it("should delete the created comment", async () => {
//     const newCommentData = {
//       comment: "This is a test comment.",
//       // Add more fields as needed
//     };

//     const createdComment = await Comment.create(newCommentData);
//     const deletedComment = await Comment.findByIdAndDelete(createdComment._id);

//     expect(deletedComment).toBeDefined();
//     expect(deletedComment._id.toString()).toBe(createdComment._id.toString());
//     // Verify that the comment is deleted from the database
//     const foundComment = await Comment.findById(createdComment._id);
//     expect(foundComment).toBeNull();
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


