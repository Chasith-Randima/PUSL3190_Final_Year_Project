const User = require("./../models/userModel");
const factory = require("./handlerFactory");

const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const path = require("path");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an Image Please upload only an image..", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserImages = upload.fields([{ name: "images", maxCount: 5 }]);

exports.resizeUserImages = catchAsync(async (req, res, next) => {
//   console.log(!req.files.images);
  if (!req.files?.images) return next();

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `user-${req.user._id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2400, 1600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});

exports.getImage = catchAsync(async (req, res) => {
  let fileName = req.params.imageName;

  let options = {
    root: path.join(__dirname, "../public/img/users"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.status(500).json({
        err,
      });
    } else {
      console.log("Sent:", fileName);
    }
  });
});

exports.searchUsers = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  //   console.log(req.query);
  if (search.length != 0) {
    await User.find({
      $or: [{ username: { $regex: search, $options: "i" } }],
    })
      .then((data) => {
        res.status(200).json({
          status: "success",
          message: `${data.length} found...`,
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          satus: "failed",
          message: err,
        });
      });
  }
});

exports.getAllUsers = factory.getAll(User);
exports.getOneUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.createUser = factory.createOne(User);