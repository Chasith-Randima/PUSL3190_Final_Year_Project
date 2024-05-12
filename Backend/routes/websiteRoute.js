const express = require("express");
const websiteController = require("./../controllers/websiteController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(websiteController.getAllWebsites)
  .post(authController.protect, websiteController.createOneWebsite);
router
  .route("/:id")
  .get(websiteController.getOneWebsite)
  .patch(authController.protect, websiteController.updateAWebsite)
  .delete(authController.protect, websiteController.deleteAWebsite);

module.exports = router;