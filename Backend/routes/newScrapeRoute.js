const express = require("express");
const scrapeController = require("./../controllers/scrapeController");
const newScraper = require("./../controllers/newScrapeController");
// const scrapeController = require("./../controllers/scrapeOptimizedController");
const authController = require("./../controllers/authController");
const router = express.Router();


// router.use("/scrapeNewsFirst",scrapeController.scrapeNewsFirst)
// router.use("/scrapeNewsFirst",newScraper.scrapeNewsFirst)
router.use("/scrapeNewsFirst",newScraper.scrapeNewsFirst)
// router.post("/scrapeOneNewsFirst",scrapeController.scrapeOneNewsFirst)
// router.use("/scrapeNewsFirst",scrapeController.scrapeOne)
router.use("/scrapeOneAdaDerana",newScraper.scrapeOneAdaDerana)
router.use("/scrapeAdaDerana",newScraper.scrapeAdaDerana)
router.use("/scrapeBBC",newScraper.scrapeBBC)
router.use("/scrapeTheSun",newScraper.scrapeTheSun)
router.use("/scrapeHindustanTimes",newScraper.scrapeHindustanTimes)
router.use("/scrapeNikkei",newScraper.scrapeNikkei)

router.use("/",newScraper.scrapeNewsFirst,newScraper.scrapeAdaDerana,newScraper.scrapeBBC,newScraper.scrapeTheSun,newScraper.scrapeHindustanTimes,newScraper.scrapeNikkei);

//   .post(authController.protect, newScraper.createOneComment);
// router
//   .route("/:id")
//   .get(newScraper.getOneComment)
//   .patch(authController.protect, newScraper.updateAComment)
//   .delete(authController.protect, newScraper.deleteAComment);

module.exports = router;