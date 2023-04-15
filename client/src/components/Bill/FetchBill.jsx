import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../App";

function FetchBill() {
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api
      .get("getBills", {
        headers: {
          Authorization: localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setBills(response.data.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);
  return (
    <div>
       <div className="row">
      {bills.map((x) => {
        return (
         
            <div
              className="card mx-auto col-lg-4 col-sm-10 mt-3 col-md-5 shadow"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">{x.customerName}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {x.phone}
                </h6>

                <button
                  type="button"
                  className="btn btn-success m-4"
                  onClick={() => navigate(`/billItem/${x._id}`)}
                >
                  Details
                </button>
              </div>
            </div>
          
        );
      })}
      </div>
    </div>
  );
}
export default FetchBill;
