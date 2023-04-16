import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { api } from "../../App";

export default function BillItemsByBillId() {
  const [billItems, setBillItems] = useState([]);
  const params = useParams();

  useEffect(() => {
    api
      .get(`billItem/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {

        setBillItems(response.data.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);
  return (
    <div>
      {billItems.map((x) => {
        return (
          <div
            className="card mx-auto col-lg-4 col-sm-10 mt-3 col-md-5 shadow "
            style={{ width: "20rem" }}
          >
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Item Id</strong>:{x.productId}
              </li>
              <li className="list-group-item">
                <strong>Quantity</strong>:{x.quantity}
              </li>
              <li className="list-group-item">
                <strong>Unit Price</strong>:{x.unitPrice}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
