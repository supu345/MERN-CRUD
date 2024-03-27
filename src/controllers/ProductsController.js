const ProductsModel = require("../models/ProductsModel");

// C=Create
exports.CreateProduct = async (req, res) => {
  try {
    let reqBody = req.body;
    let result = await ProductsModel.create(reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e.toString() });
  }
};

// R=Read
exports.ReadProduct = async (req, res) => {
  try {
    let result = await ProductsModel.find();
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e.toString() });
  }
};

// R=Read By ID
exports.ReadProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: id };
    const data = await ProductsModel.find(query).exec();
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};

// U=Update

exports.UpdateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let reqBody = req.body;
    let result = await ProductsModel.updateOne({ _id: id }, reqBody);
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e.toString() });
  }
};

// D=Delete
exports.DeleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let result = await ProductsModel.deleteOne({ _id: id });
    res.status(200).json({ status: "success", data: result });
  } catch (e) {
    res.status(200).json({ status: "fail", data: e.toString() });
  }
};

//Pagination

exports.ProductList = async (req, res) => {
  let pageNo = Number(req.params.pageNo);
  let perPage = Number(req.params.perPage);
  let searchValue = req.params.searchKey;
  const skipRow = (pageNo - 1) * perPage;
  let Rows;
  let Total;

  try {
    if (searchValue !== "0") {
      let SearchRgx = { $regex: searchValue, $options: "i" };
      let SearchQuery = { $or: [{ ProductName: SearchRgx }] };

      const totalResult = await ProductsModel.aggregate([
        { $match: SearchQuery },
        { $group: { _id: null, total: { $sum: 1 } } }, // Grouping to count total
      ]);

      Total = totalResult.length > 0 ? totalResult[0].total : 0;

      Rows = await ProductsModel.aggregate([
        { $match: SearchQuery },
        { $skip: skipRow },
        { $limit: perPage },
      ]);
    } else {
      const totalResult = await ProductsModel.aggregate([
        { $group: { _id: null, total: { $sum: 1 } } }, // Grouping to count total
      ]);

      Total = totalResult.length > 0 ? totalResult[0].total : 0;

      Rows = await ProductsModel.aggregate([
        { $skip: skipRow },
        { $limit: perPage },
      ]);
    }

    res.status(200).json({ status: "success", total: Total, data: Rows });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
