import { Fragment, React, useEffect } from "react";
//import './User.css'
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState();

  // const params = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/`, {
        headers: { Authorization: localStorage.getItem("auth-token") },
      })
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => console.log(error.response.data));
  }, []);
  return (
    <Fragment>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <div className="card" style={{ width: "18rem" }}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </Fragment>
  );
}

export default User;
