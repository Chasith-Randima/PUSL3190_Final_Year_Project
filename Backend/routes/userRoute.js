const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use("/image/:imageName", userController.getImage);
router.use("/search", userController.searchUsers);

router.use(authController.protect);

router.patch("/updateMyPassword/:id", authController.updatePassword);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(
    userController.uploadUserImages,
    userController.resizeUserImages,
    userController.createUser
  );

router
  .route("/:id")
  .get(userController.getOneUser)
  // .get(authController.restrictTo("admin"), userController.getOneUser)
  .patch(
    userController.uploadUserImages,
    userController.resizeUserImages,
    userController.updateUser
  )
  .delete(userController.deleteUser);

module.exports = router;