import { Fragment, React } from "react";
import { useState } from "react";
import axios from "axios";
import { api } from "../../App";

function Products() {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    productName: "",
    unit: "",
    price: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setDetails((prev) => {
      console.log(prev);
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(details);
    console.log(localStorage.getItem("auth-token"));
    api
      .post("/productss", details, {
        headers: {
          Authorization: localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    //error.response.data.error.details
  }
  return (
    <Fragment>
      <div className="">
        <div className="container col-lg-3 col-5 shadow p-4 rounded">
          <h1 className="">CREATE PRODUCT</h1>
          <hr className="" />
          {error && <p className="alert alert-danger">{error}</p>}
          <form>
            <div className="form-group mt-3 mt-4">
              <label htmlFor="productName" className="form-label ">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="productName"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="unit" className="form-label">
                Unit
              </label>
              <input
                type="text"
                className="form-control"
                id="unit"
                name="unit"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="price" className="form-label ">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                onChange={handleChange}
              />
            </div>

            <input
              type="submit"
              className="form-control btn btn-success  mt-4"
              onClick={handleSubmit}
            ></input>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Products;
