const Website = require("./../models/websiteModel");
const factory = require("./handlerFactory");

exports.createOneWebsite = factory.createOne(Website);
exports.getOneWebsite = factory.getOne(Website);
// exports.getOneWebsite = factory.getOne(Website, {
//   path: "user_virtual",
//   select: "-__v",
// });
exports.getAllWebsites = factory.getAll(Website);
exports.updateAWebsite = factory.updateOne(Website);
exports.deleteAWebsite = factory.deleteOne(Website);