import React, { useRef } from "react";
import {
  ErrorToast,
  IsEmpty,
  SuccessToast,
} from "../../Helper/ValidationHelper";
import { Create } from "../../APIServices/CRUDServices";
import FullScreenLoader from "../Common/FullScreenLoader";

const CreateForm = () => {
  let ProductName,
    ProductCode,
    Img,
    UnitPrice,
    Qty,
    TotalPrice,
    Loader = useRef();

  const SaveData = () => {
    let Product_Name = ProductName.value;
    let Product_Code = ProductCode.value;
    let Product_Image = Img.value;
    let Unit_Price = UnitPrice.value;
    let Product_Qty = Qty.value;
    let Total_Price = TotalPrice.value;

    if (IsEmpty(Product_Name)) {
      ErrorToast("Product Name Required");
    } else if (IsEmpty(Product_Code)) {
      ErrorToast("Product Code Required");
    } else if (IsEmpty(Product_Image)) {
      ErrorToast("Product Image Required");
    } else if (IsEmpty(Unit_Price)) {
      ErrorToast("Product Unit Price Required");
    } else if (IsEmpty(Product_Qty)) {
      ErrorToast("Product Qty Required");
    } else if (IsEmpty(Total_Price)) {
      ErrorToast("Total Price Required");
    } else {
      Loader.classList.remove("d-none");
      const postBody = {
        ProductName: Product_Name,
        ProductCode: Product_Code,
        Img: Product_Image,
        UnitPrice: Unit_Price,
        Qty: Product_Qty,
        TotalPrice: Total_Price,
      };

      //Data Create
      Create(postBody).then((Result) => {
        Loader.classList.add("d-none");
        if (Result === true) {
          SuccessToast("Data Save Success");
          ProductName.value = "";
          ProductCode.value = "";
          Img.value = "";
          UnitPrice.value = "";
          Qty.value = "";
          TotalPrice.value = "";
        } else {
          ErrorToast("Request Fail Try again");
        }
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 p-2">
            <label>Product Name</label>
            <input
              ref={(input) => (ProductName = input)}
              type="text"
              className="form-control"
            />
          </div>

          <div className="col-md-4 p-2">
            <label> Product Code</label>
            <input
              ref={(input) => (ProductCode = input)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-4 p-2">
            <label>Product Image</label>
            <input
              ref={(input) => (Img = input)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-4 p-2">
            <label>Unit Price</label>
            <input
              ref={(input) => (UnitPrice = input)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-4 p-2">
            <label>Product Qty</label>
            <input
              ref={(input) => (Qty = input)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-4 p-2">
            <label>Total Price</label>
            <input
              ref={(input) => (TotalPrice = input)}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 p-2">
            <button onClick={SaveData} className="btn btn-success w-100">
              Save Product
            </button>
          </div>
        </div>
      </div>
      <div className="d-none" ref={(div) => (Loader = div)}>
        <FullScreenLoader />
      </div>
    </div>
  );
};

export default CreateForm;
