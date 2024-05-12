const express = require("express");
const scrapedArticleController = require("./../controllers/scrapedArticleController");
const newScraper = require("./../controllers/newScrapeController")
const authController = require("./../controllers/authController");
const router = express.Router();

router.use("/image/:imageName", scrapedArticleController.getImage);
router.use("/search", scrapedArticleController.searchScrapedArticles);

router
  .route("/")
  .get(scrapedArticleController.getAllScrapedArticles)
  .post(
    authController.protect,
    scrapedArticleController.uploadScrapedArticleImages,
    scrapedArticleController.resizeScrapedArticleImages,
    scrapedArticleController.createOneScrapedArticle
  );
router
  .route("/:id")
  .get(scrapedArticleController.getOneScrapedArticle)
  .patch(
    authController.protect,
    scrapedArticleController.uploadScrapedArticleImages,
    scrapedArticleController.resizeScrapedArticleImages,
    scrapedArticleController.updateScrapedArticle
  )
  .delete(authController.protect, scrapedArticleController.deleteScrapedArticle);

module.exports = router;