import { Fragment, React } from "react";
import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { api } from "../../App";
import { useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate= useNavigate()

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    api
      .post("/register", details)
      .then((response) => {
        console.log(response.data);
        navigate("/login")
      })
      .catch((error) => {
        console.log(error.response.data)
        setError(error.response.data.message);
      });
  }
  return (
    <Fragment>
      <div className="container mt-4">
        <div className="container col-lg-5 col-md-6 col-sm-10 shadow rounded p-4">
          <h1 className="">REGISTER HERE</h1>
          <hr className="" />
          {error && <p className="alert alert-danger">{error}</p>}
          <form>
            <div className="form-group">
              <label htmlFor="userName" className="form-label  ">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputEmail1" className="form-label ">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
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

export default Register;
