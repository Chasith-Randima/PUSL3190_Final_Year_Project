const express = require("express");
const scrapeController = require("./../controllers/scrapeController");
const newScraper = require("./../controllers/newScrapeController");
// const scrapeController = require("./../controllers/scrapeOptimizedController");
const authController = require("./../controllers/authController");
const router = express.Router();


router.use("/single/scrapeOneAdaDerana",scrapeController.scrapeOneAdaDerana)
router.use("/single/scrapeOneNewsFirst",scrapeController.scrapeOneNewsFirst)
router.use("/single/scrapeOneBBC",scrapeController.scrapeOneBBC)
router.use("/single/scrapeOneTheSun",scrapeController.scrapeOneTheSun)
router.use("/single/scrapeOneHindustanTimes",scrapeController.scrapeOneHindustanTimes)
router.use("/single/scrapeOneNikkei",scrapeController.scrapeOneNikkei)

router.use("/scrapeNewsFirst",scrapeController.scrapeNewsFirst)
// router.use("/scrapeNewsFirst",newScraper.scrapeNewsFirst)
// router.use("/scrapeNewsFirst",newScraper.scrapeNewsFirst)
// router.post("/scrapeOneNewsFirst",scrapeController.scrapeOneNewsFirst)
// router.use("/scrapeNewsFirst",scrapeController.scrapeOne)
// router.use("/scrapeOneAdaDerana",scrapeController.scrapeOneAdaDerana)
router.use("/scrapeAdaDerana",scrapeController.scrapeAdaDerana)
router.use("/scrapeBBC",scrapeController.scrapeBBC)
router.use("/scrapeTheSun",scrapeController.scrapeTheSun)
router.use("/scrapeHindustanTimes",scrapeController.scrapeHindustanTimes)
router.use("/scrapeNikkei",scrapeController.scrapeNikkei)

router.use("/",scrapeController.scrapeNewsFirst,scrapeController.scrapeAdaDerana,scrapeController.scrapeBBC,scrapeController.scrapeHindustanTimes,scrapeController.scrapeNikkei,scrapeController.scrapeTheSun);

//   .post(authController.protect, scrapeController.createOneComment);
// router
//   .route("/:id")
//   .get(scrapeController.getOneComment)
//   .patch(authController.protect, scrapeController.updateAComment)
//   .delete(authController.protect, scrapeController.deleteAComment);

module.exports = router;