const express = require("express");
const articleController = require("./../controllers/articleController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use("/image/:imageName", articleController.getImage);
router.use("/search", articleController.searchArticles);

router
  .route("/")
  .get(articleController.getAllArticles)
  .post(
    authController.protect,
    articleController.uploadArticleImages,
    articleController.resizeArticleImages,
    articleController.createOneArticle
  );
router
  .route("/:id")
  .get(articleController.getOneArticle)
  .patch(
    authController.protect,
    articleController.uploadArticleImages,
    articleController.resizeArticleImages,
    articleController.updateArticle
  )
  .delete(authController.protect, articleController.deleteArticle);

module.exports = router;