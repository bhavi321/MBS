import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../App";
import "./Products.css"

function FetchProducts() {
  let [products, setProducts] = useState([]);
  const [updatedProduct,setUpdatedProduct] = useState({})
 const navigate = useNavigate()
  useEffect(() => {
    api
      .get("/products", {
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

  function deleteProduct(e){
    api
      .put(`/products/delete/${e.target.value}`,null, {
        headers: {
          Authorization: localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        //setUpdatedProduct(response.data.data)
console.log(products)
        let y=products.findIndex((x)=>x._id==e.target.value)
        console.log(y)
        products.splice(y,1)
       setProducts([...products])
      
      })
      .catch((error) => {
        console.log(error);
      });
    //error.response.data.error.details
    }
  return (
    <div>
       <div className="row">
      {products.map((x) => {
        return (       
            <div
              className="card mx-auto col-lg-4 col-sm-10 mt-3 col-md-5 shadow fetchCard"
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
              
                <button type="button" className="btn btn-success" onClick={() => navigate(`/products/update/${x._id}`)}
                >
                  Update
                </button>
                <button type="button" className="btn btn-success ms-3" value = {x._id} onClick={deleteProduct} //x._id
                >Delete
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
