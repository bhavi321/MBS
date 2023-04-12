import { Fragment, React, useEffect } from "react";
//import './User.css'
import { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function GetProducts() {
  const [products, setProducts] = useState([]);

  const [numberOfElements, setNumberOfElements] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/`, {
        headers: { Authorization: localStorage.getItem("auth-token") },
      })
      .then((response) => {
        setProducts(response.data.data);
        console.log(products);
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  function handleChange({ target: { value, name } }, index) {
    const item = items[index] || {};
    item[name] = value;
    items[index] = { ...item };
    setItems([...items]);
  }
  function handleSubmit() {
    console.log();
  }
  return (
    <div className="container">
      <div className={"row"}>
        <div className="mx-auto col mt-4">
          {new Array(numberOfElements).fill(0).map((x, index) => (
            <div className="border p-4 mt-4 rounded">
              <select
                name="productId"
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => handleChange(e, index)}
              >
                <option selected>Choose</option>
                {products.map((p) => {
                  return <option value={p._id}>{p.productName}</option>;
                })}
              </select>

              <div className="input-group mt-3">
                <span className="input-group-text" id="basic-addon1">
                  Quantity
                </span>
                <input
                  type="text"
                  name="quantity"
                  onChange={(e) => handleChange(e, index)}
                  className="form-control"
                  placeholder="As much as you want"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          ))}

          <div>
            <button
              type="button"
              className="btn btn-success m-4"
              onClick={handleSubmit}
            >
              Create Bill
            </button>
            <button
              type="button"
              className="btn btn-secondary m-4"
              onClick={() => setNumberOfElements(numberOfElements + 1)}
            >
              Add More
            </button>
          </div>
        </div>

        <div className="col">{JSON.stringify(items)}</div>
      </div>
    </div>
  );
}

export default GetProducts;
