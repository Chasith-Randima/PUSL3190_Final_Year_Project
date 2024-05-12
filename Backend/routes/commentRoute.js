const express = require("express");
const commentController = require("./../controllers/commentController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(commentController.getAllComments)
  .post(commentController.createOneComment);
  // .post(authController.protect, commentController.createOneComment);
router
  .route("/:id")
  .get(commentController.getOneComment)
  .patch(authController.protect, commentController.updateAComment)
  .delete(authController.protect, commentController.deleteAComment);

module.exports = router;