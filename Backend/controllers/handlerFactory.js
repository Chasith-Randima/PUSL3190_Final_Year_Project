const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");



exports.createOne = (Model, name_model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    if (
      name_model == "phone" ||
      name_model == "Accessory" ||
      name_model == "Wanted"
    ) {
      req.body.user = req.user._id;
    }
    if (req.body?.createdAt) {
      req.body.createdAt = req.requestTime;
    }
    // console.log(req.body);
    // try {
    const doc = await Model.create(req.body);
    // } catch (error) {
    //   return res.status(400).json(error);
    // }

    res.status(200).json({
      status: "success",
      message: "posted successfully...",
      doc,
    });
  });

exports.getOne = (Model, popOptions, productName) =>
  catchAsync(async (req, res, next) => {
    let query = await Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    // if ((productName = "Product")) {
    //   const updatedCount = await Count.findOneAndUpdate(
    //     { productId: doc._id },
    //     { $inc: { count: 1 } },
    //     { upsert: true, new: true }
    //   );

    //   const roomId = "12345";
    //   const key = "new-order";
    //   const message = "new order assigned";

    //   sendMessage(req.params.id, "test", {
    //     count: 1,
    //   });

    //   // Emit the updated count to all connected clients
    //   // socketSend.emit(`product:${productId}`, updatedCount.count);
    // }
    // console.log(typeof doc);

    res.status(200).json({
      status: "success",
      message: "found the document...",
      doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.params, req.query);
    let filter = {};
    if (req.params.id) filter = { user: req.params.id };
    // if (req.params.createdAt) filter.createdAt = req.query.createdAt;
    // if (req.query.createdAt) {
    //   const selectedDate = new Date(req.query.createdAt);

    //   // Check if the selectedDate is a valid Date object
    //   if (!isNaN(selectedDate)) {
    //     // Set the start of the day
    //     const startDate = new Date(selectedDate);
    //     startDate.setUTCHours(0, 0, 0, 0);

    //     // Set the end of the day
    //     const endDate = new Date(selectedDate);
    //     endDate.setUTCHours(23, 59, 59, 999);

    //     filter.createdAt = {
    //       $gte: startDate.toISOString(),
    //       $lt: endDate.toISOString(),
    //     };
    //   } else {
    //     console.error("Invalid date parameter:", req.query.createdAt);
    //   }
    // }
    console.log(filter);
    // if (req.query.priceMin) {
    //   let query = JSON.stringify(req.query);
    //   console.log(query);
    //   query = query.replace("priceMin", "price[gte]");
    //   query = JSON.parse(query);
    //   console.log(query);
    //   req.query = { ...req.query, query };
    //   console.log(query);
    // }
    // if (req.query.priceMax) {
    //   let query = JSON.stringify(req.query);
    //   console.log(query);
    //   query = query.replace("priceMax", "price[lte]");
    //   query = JSON.parse(query);
    //   console.log(query);
    //   req.query = { ...req.query, query };
    //   console.log(query);
    // }

    console.log(req.query);

    // const features = new APIFeatures(Model.find(), req.query)
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const count = new APIFeatures(Model.countDocuments(filter), req.query)
    //   .sort()
    //   .limitFields();
    // const count = await Model.countDocuments({}).filter().sort().limitFields();

    const doc = await features.query;
    let count = await new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields();
    let totalCount = await count.query.countDocuments();
    // console.log(totalCount);

    // const count = await Model.countDocuments(
    //   new APIFeatures(Model.find(filter), req.query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    // );
    // queries.limit = undefined;
    // queries.page = undefined;
    // console.log(await Model.count(queries));

    res.status(200).json({
      status: "success",
      message: `${doc.length} documents found...`,
      results: doc.length,
      totalCount,
      doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.body, req.params.id);
    // console.log(req.body);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      //   runValidators: true,
    });
    // console.log(doc);

    if (!doc) {
      return next(new AppError("no document found with that Id", 404));
    }

    res.status(200).json({
      status: "success",
      message: "ducument updated successfully....",
      doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("no document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Document deleted successfully...",
    });
  });