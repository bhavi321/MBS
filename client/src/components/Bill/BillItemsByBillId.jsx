import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function BillItemsByBillId() {
  const [billItems, setBillItems] = useState([]);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/billItem/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        console.log(response.data.data);
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
            style={{ width: "18rem" }}
          >
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>billId</strong>:{x.productId}
              </li>
              <li className="list-group-item">
                <strong>quantity</strong>:{x.quantity}
              </li>
              <li className="list-group-item">
                <strong>unitPrice</strong>:{x.unitPrice}
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
