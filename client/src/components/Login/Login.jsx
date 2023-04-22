import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { api } from "../../App";
import "./Login.css";
import { useAuth } from "../../contexts/AuthContextProvider";

const Login = function () {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const { loginSuccess } = useAuth();
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;

    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    api
      .post("/login", details)
      .then((res) => {
        const token = res.data.data;
        setError("");
        loginSuccess(token);
        navigate("/bill");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <div className="container">
      <div className="col-lg-6 mt-4 mx-auto shadow p-4 incontainer" style={{backgroundColor:"rgb(252, 171, 171)"}}>
        <h1 className="heading ms-5">Login Here</h1>

        <hr />

        <div>
          {error && <p className="alert alert-danger">{error}</p>}
          <form>
            <div className="form-group mt-4">
              <label htmlFor="email" className="form-label">
                Email Id :
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-group mt-4">
              <label html for="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              ></input>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-success button"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>

        <div className="">
          <h2 className="mt-5 ms-3">Don't have an account?</h2>
          <hr />
          <button className="btn btn-dark">
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
