const ScrapedArticle = require("./../models/scrapedArticleModel");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(req.body);
  console.log(file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image,Please upload only an Image", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadScrapedArticleImages = upload.fields([{ name: "images", maxCount: 5 }]);

exports.resizeScrapedArticleImages = catchAsync(async (req, res, next) => {
  // console.log(req.files);
  if (!req.files?.images) return next();
  console.log(req.body);

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `scrapedArticle-${req.user._id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2400, 1600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/scrapedArticle/${filename}`);

      req.body.images.push(filename);
    })
  );

  console.log(req.body);
  next();
});

exports.getImage = catchAsync(async (req, res) => {
  let fileName = req.params.imageName;
  // console.log(path.join(__dirname, "../public/img/phones"));
  let options = {
    root: path.join(__dirname, "../public/img/scrapedArticle"),
    // path: `public/img/phones/${req.params.name}`,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      // next(err)
      // console.log(err);
      res.status(500).json({
        err,
      });
    } else {
      console.log("Sent:", fileName);
    }
  });
});

exports.searchScrapedArticles = catchAsync(async (req, res) => {
  const { search } = req.query;
  console.log(search);

  if (search) {
    await ScrapedArticle.find(
      {
        $or: [
          { articleTitle: { $regex: search, $options: "i" } },
        //   { model: { $regex: search, $options: "i" } },
        //   { ram: { $regex: search, $options: "i" } },
        //   { processor: { $regex: search, $options: "i" } },
        ],
      }
      // (err, phones) => {
      //   if (err) {
      //     console.log(err);
      //     // res.status(500).json({
      //     //   status: "failed",
      //     //   message: "There was an error...",
      //     // });
      //   }

      //   res.status(200).json(phones);
      // }
    )
      // .select(
      //   "-images -description -discount -price -createdAt -user -productNumber -category -subCategory -brandname"
      // )
      .then((data) => {
        // console.log(data);
        res.status(200).json({
          status: "success",
          message: `${data.length} found...`,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "failed",
          message: err,
        });
      });
  }
});


exports.createOneScrapedArticle = factory.createOne(ScrapedArticle);
exports.getOneScrapedArticle = factory.getOne(ScrapedArticle, "", "ScrapedArticle");
// exports.getOneScrapedArticle = factory.getOne(ScrapedArticle, {
//   path: "user_virtual",
//   select: "-__v",
// });
exports.getAllScrapedArticles = factory.getAll(ScrapedArticle);
exports.updateScrapedArticle = factory.updateOne(ScrapedArticle);
exports.deleteScrapedArticle = factory.deleteOne(ScrapedArticle);