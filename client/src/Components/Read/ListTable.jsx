import React, { useEffect, useState } from "react";
import { Delete, Read } from "../../APIServices/CRUDServices";
import FullScreenLoader from "../Common/FullScreenLoader";
import { ErrorToast, SuccessToast } from "../../Helper/ValidationHelper";
import { useNavigate } from "react-router";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { GetProductList } from "../../APIServices/CRUDServices";

const ListTable = (props) => {
  let [searchKey, setSearchKey] = useState("0");
  let [perPageKey, setPerPageKey] = useState(5);
  //let [DataList, SetDataList] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   Read().then((Result) => {
  //     // console.log(Result);
  //     SetDataList(Result);
  //   });
  // }, [perPageKey, searchKey]);

  useEffect(() => {
    GetProductList(1, perPageKey, searchKey);
  }, []);

  let ALLProduct = useSelector((state) => state.product.ALLProduct);

  //console.log(ALLProduct);
  let Total = useSelector((state) => state.product.Total);

  const handlePageClick = (event) => {
    GetProductList(event.selected + 1, perPageKey, searchKey);
  };

  const PageKeyOnChange = (e) => {
    setPerPageKey(parseInt(e.target.value));
    GetProductList(1, e.target.value, searchKey);
  };
  const searchData = () => {
    GetProductList(1, perPageKey, searchKey);
  };

  const searchOnChange = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKey("0");
      GetProductList(1, perPageKey, "0");
    }
  };
  const DeleteItem = (id) => {
    // alert(id);
    Delete(id).then((result) => {
      if (result === true) {
        SuccessToast("Delete Success");
        navigate("/");
      } else {
        ErrorToast("Request Fail Try Again");
      }
    });
  };
  const UpdateItem = (id) => {
    // alert(id);
    navigate("/update/" + id);
  };
  if (ALLProduct.length > 0) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card list-card">
              <div className="card-header pb-0">
                <h4>Product List</h4>
              </div>
              <div className="col-2 my-3">
                <select
                  onChange={PageKeyOnChange}
                  className="form-control mx-2 form-select-sm form-select form-control-sm"
                >
                  <option value="5">5 Per Page</option>
                  <option value="10">10 Per Page</option>
                  <option value="20">20 Per Page</option>
                  <option value="30">30 Per Page</option>
                  <option value="50">50 Per Page</option>
                  <option value="100">100 Per Page</option>
                  <option value="200">200 Per Page</option>
                  <option value="200">200 Per Page</option>
                </select>
              </div>
              <div className="col-4">
                <div className="input-group mb-3">
                  <input
                    onChange={searchOnChange}
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Search.."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <button
                    onClick={searchData}
                    className="btn  btn-outline-primary btn-sm mb-0"
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="card-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Product Name
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Product Code
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Product Image
                      </th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                        Unit Price
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Qty
                      </th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                        Total Price
                      </th>
                      <th className="text-secondary opacity-7">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ALLProduct.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <div className="d-flex  animated fadeInUp px-2 py-1">
                              <div className="d-flex flex-column justify-content-center">
                                <h6 className="mb-0 text-sm">
                                  {item.ProductName}
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <p className="text-xs text-secondary mb-0">
                                {item.ProductCode}
                              </p>
                            </div>
                          </td>
                          <td>
                            <div>
                              <img
                                src={item.Img}
                                className="avatar avatar-sm me-3"
                                alt="user1"
                              />
                            </div>
                          </td>
                          <td>
                            <h6 className="mb-0 animated fadeInUp text-sm">
                              {" "}
                              {item.UnitPrice}
                            </h6>
                          </td>
                          <td>
                            <h6 className="mb-0 animated fadeInUp text-sm">
                              {" "}
                              {item.Qty}
                            </h6>
                          </td>
                          <td>
                            <h6 className="mb-0 animated fadeInUp text-sm">
                              {" "}
                              {item.TotalPrice}
                            </h6>
                          </td>
                          <td>
                            <div>
                              <button
                                onClick={DeleteItem.bind(this, item._id)}
                                className="btn btn-danger mx-1 "
                              >
                                Delete
                              </button>
                              <button
                                onClick={UpdateItem.bind(this, item._id)}
                                className="btn  btn-success mx-1"
                              >
                                Update
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="col-12 mt-5">
                  <nav aria-label="Page navigation example">
                    <ReactPaginate
                      previousLabel="<"
                      nextLabel=">"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      pageCount={Total / perPageKey}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={handlePageClick}
                      containerClassName="pagination"
                      activeClassName="active"
                    />
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <FullScreenLoader />
      </div>
    );
  }
};

export default ListTable;
