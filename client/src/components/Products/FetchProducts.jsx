import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function FetchProducts() {
  const [products, setProducts] = useState([]);
  const [updatedProduct,setUpdatedProduct] = useState({})
 const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3001/products", {
        headers: {
          Authorization: localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);
  return (
    <div>
       <div className="row">
      {products.map((x) => {
        return (
         
            <div
              className="card mx-auto col-lg-4 col-sm-10 mt-3 col-md-5 shadow"
              style={{ width: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">{x.productName}</h5>
                <h6 className="mb-2 text-body-primary">
                  unit: {x.unit}
                </h6>
                <h6 className=" mb-2 text-body-primary">
                  price: {x.price}
                </h6>
              
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => navigate(`/products/update/${x._id}`)}
                >
                  Update
                </button>

                
              </div>
            </div>
         
        );
      })}

      {}
       </div>
    </div>
  );
}
export default FetchProducts;
