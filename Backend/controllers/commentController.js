const Comment = require("./../models/commentModel");
const factory = require("./handlerFactory");

exports.createOneComment = factory.createOne(Comment);
exports.getOneComment = factory.getOne(Comment);
// exports.getOneComment = factory.getOne(Comment, {
//   path: "user_virtual",
//   select: "-__v",
// });
exports.getAllComments = factory.getAll(Comment);
exports.updateAComment = factory.updateOne(Comment);
exports.deleteAComment = factory.deleteOne(Comment);