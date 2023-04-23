import { React, useEffect } from "react";
//import './User.css'
import { useState } from "react";
import axios from "axios";
import { api } from "../../App";
import "./Bill.css";


function Bill() {
  const [products, setProducts] = useState([]);

  const [numberOfElements, setNumberOfElements] = useState(1);
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [billItems, setBillItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const[error,setError] = useState("")
 

  useEffect(() => {
    api
      .get(`/products`, {
        headers: { Authorization: localStorage.getItem("auth-token") },
      })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => setError(error.response.data.message));
  }, []);

  function handleChange({ target: { value, name } }, index) {
    const item = items[index] || {};
    item[name] = value;
    items[index] = { ...item };
    setItems([...items]);
  }
  function handleSubmit() {
    api
      .post(
        "bill/",
        { customerName, phone, items },
        {
          headers: {
            Authorization: localStorage.getItem("auth-token"),
          },
        }
      )
      .then((res) => {
        setBillItems(res.data.data.items);
        setTotalPrice(res.data.data.bill.totalPrice);
      })
      .catch((error) => {console.log(error.response)
        setError(error.response.data.message)});
  }

  return (
    <div className="container billContainer">
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="input-group mt-3 p-3">
      
        <span
          className="input-group-text"
          style={{ backgroundColor: "rgb(197, 188, 188)" }}
          id="basic-addon1"
        >
          <strong>Customer Name</strong>
        </span>
        <input
          type="text"
          name="customerName"
          className="form-control"
          placeholder="Enter Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group mt-3">
        <span
          className="input-group-text ms-3"
          style={{ backgroundColor: "rgb(197, 188, 188)" }}
          id="basic-addon1"
        >
          <strong> Phone</strong>
        </span>
        <input
          type="text"
          name="phone"
          className="form-control"
          placeholder="Enter Number"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          aria-label="Phone"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className={"row"}>
        <div className="mx-auto col mt-4">
          {new Array(numberOfElements).fill(0).map((x, index) => (
            <div className="border border-3 p-4 mt-4 rounded">
              <select
                name="productId"
                className="form-select"
                style={{ backgroundColor: "rgb(197, 188, 188)" }}
                aria-label="Default select example"
                onChange={(e) => handleChange(e, index)}
              >
                <option selected>
                  <strong>Choose</strong>
                </option>
                {products.map((p) => {
                  return <option value={p._id}>{p.productName}</option>;
                })}
              </select>

              <div className="input-group mt-3">
                <span
                  className="input-group-text"
                  style={{ backgroundColor: "rgb(197, 188, 188)" }}
                  id="basic-addon1"
                >
                  <strong>Quantity</strong>
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

        {/* <div className="col">{JSON.stringify(items)}</div> */}
      </div>

     
      <hr />

                <button className = "btn btn-dark text"onClick={()=>window.print()}> <strong>Print</strong> </button>
      <hr />
      {billItems.length >= 1 ? (
        <div className="print" >
          <pre class="fs-4 border">
            Customer Name: {customerName}
            <br />
            Phone No: {phone}
            <br />
            Total Price: {totalPrice}
          </pre>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Items</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {billItems.map((x, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {
                        products.find((item) => item._id === x.productId)
                          .productName
                      }
                    </td>
                    <td>{Number(x.unitPrice) / x.quantity}</td>
                    <td>{x.quantity}</td>
                    <td>{x.unitPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Bill;
