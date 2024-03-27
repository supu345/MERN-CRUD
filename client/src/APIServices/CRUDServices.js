import axios from "axios";
import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice";
import { SetALLProduct, SetTotal } from "../redux/state-slice/product-slice";
const BaseURL = "http://localhost:5000/api/v1";
// export async function Create(
//   ProductName,
//   ProductCode,
//   Img,
//   UnitPrice,
//   Qty,
//   TotalPrice
// ) {
//   try {
//     const URL = "/api/v1/CreateProduct";
//     const PostBody = {
//       ProductName: ProductName,
//       ProductCode: ProductCode,
//       Img: Img,
//       UnitPrice: UnitPrice,
//       Qty: Qty,
//       TotalPrice: TotalPrice,
//     };

//     const response = await axios.post(URL, PostBody);

//     if (response.status === 200) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }

export async function Create(postBody) {
  try {
    let res = await axios.post(
      "http://localhost:5000/api/v1/CreateProduct",
      postBody
    );
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

export async function Read() {
  let URL = "/api/v1/ReadProduct";

  return await axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        return res.data["data"];
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}
//ReadByID
export async function ReadByID(id) {
  try {
    const URL = `/api/v1/ReadProductByID/${id}`;
    const response = await axios.get(URL);

    if (response.status === 200) {
      return response.data.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function Delete(id) {
  let URL = "/api/v1/DeleteProduct/" + id;
  return await axios
    .get(URL)
    .then((res) => {
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export async function Update(id, postBody) {
  const URL = `/api/v1/UpdateProduct/${id}`;
  try {
    const response = await axios.post(URL, postBody);
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

//pagination
export function GetProductList(pageNo, perPage, searchKey) {
  store.dispatch(ShowLoader());
  let URL =
    BaseURL + "/ProductList/" + pageNo + "/" + perPage + "/" + searchKey;
  axios
    .get(URL)
    .then((res) => {
      store.dispatch(HideLoader());
      if (res.status === 200) {
        store.dispatch(SetALLProduct(res.data["data"]));
        store.dispatch(SetTotal(res.data["total"]));
      } else {
      }
    })
    .catch((err) => {
      store.dispatch(HideLoader());
    });
}
