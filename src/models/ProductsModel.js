const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    ProductName: { type: String, required: true },
    ProductCode: { type: Number, required: true, unique: true },
    Img: { type: String },
    UnitPrice: { type: Number, default: 100 },
    Qty: { type: Number, required: true },
    TotalPrice: { type: Number, required: true },
  },
  { versionKey: false, timeStamp: true }
);

const ProductsModel = mongoose.model("products", DataSchema);
module.exports = ProductsModel;
