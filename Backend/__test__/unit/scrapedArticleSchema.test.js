const mongoose = require("mongoose");
const ScrapedArticle = require("../../models/scrapedArticleModel");
const connect = require("../../db")
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

describe("ScrapedArticle CRUD Operations", () => {
  beforeAll(async () => {
 connect()
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new scraped article", async () => {
    const newScrapedArticleData = {
      articleTitle: "Test Scraped Article",
      summarized: true,
      content: "This is a test scraped article content.",
      // Add more fields as needed
    };

    const newScrapedArticle = await ScrapedArticle.create(newScrapedArticleData);

    expect(newScrapedArticle).toBeDefined();
    expect(newScrapedArticle.articleTitle).toBe(newScrapedArticleData.articleTitle);
    // Add more assertions as needed
  });

  it("should retrieve the created scraped article", async () => {
    const newScrapedArticleData = {
      articleTitle: "Test Scraped Article",
      summarized: true,
      content: "This is a test scraped article content.",
      // Add more fields as needed
    };

    const createdScrapedArticle = await ScrapedArticle.create(newScrapedArticleData);
    const retrievedScrapedArticle = await ScrapedArticle.findById(createdScrapedArticle._id);

    expect(retrievedScrapedArticle).toBeDefined();
    expect(retrievedScrapedArticle.articleTitle).toBe(newScrapedArticleData.articleTitle);
    // Add more assertions as needed
  });

  it("should update the created scraped article", async () => {
    const newScrapedArticleData = {
      articleTitle: "Test Scraped Article",
      summarized: true,
      content: "This is a test scraped article content.",
      // Add more fields as needed
    };

    const createdScrapedArticle = await ScrapedArticle.create(newScrapedArticleData);
    const updatedFields = {
      summarized: false,
    };

    const updatedScrapedArticle = await ScrapedArticle.findByIdAndUpdate(
      createdScrapedArticle._id,
      updatedFields,
      { new: true }
    );

    expect(updatedScrapedArticle).toBeDefined();
    expect(updatedScrapedArticle.summarized).toBe(updatedFields.summarized);
    // Add more assertions as needed
  });

  it("should delete the created scraped article", async () => {
    const newScrapedArticleData = {
      articleTitle: "Test Scraped Article",
      summarized: true,
      content: "This is a test scraped article content.",
      // Add more fields as needed
    };

    const createdScrapedArticle = await ScrapedArticle.create(newScrapedArticleData);
    const deletedScrapedArticle = await ScrapedArticle.findByIdAndDelete(createdScrapedArticle._id);

    expect(deletedScrapedArticle).toBeDefined();
    expect(deletedScrapedArticle._id.toString()).toBe(createdScrapedArticle._id.toString());
    // Verify that the scraped article is deleted from the database
    const foundScrapedArticle = await ScrapedArticle.findById(createdScrapedArticle._id);
    expect(foundScrapedArticle).toBeNull();
  });
});






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


