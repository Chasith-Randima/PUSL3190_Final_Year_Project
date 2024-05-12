const express = require("express");
const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.use("/image/:imageName", postController.getImage);
router.use("/search", postController.searchPosts);

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    authController.protect,
    postController.uploadPostImages,
    postController.resizePostImages,
    postController.createOnePost
  );
router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(
    authController.protect,
    postController.uploadPostImages,
    postController.resizePostImages,
    postController.updatePost
  )
  .delete(authController.protect, postController.deletePost);

module.exports = router;