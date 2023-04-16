import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { api } from "../../App";
import "./Login.css";


const Login = function () {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;

    setDetails((prev) => {
      console.log(prev);
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    api
      .post("/login", details)
      .then((res) => {
        const token = res.data.data;
        console.log(token);
        setError("");
        localStorage.setItem("auth-token", `Bearer ${token}`);
        console.log(localStorage.getItem("auth-token"));

        navigate("/bill");
      })
      .catch((error) => {
        console.log(error)
        setError(error.response.data.message);
      });
  }

  return (
    <div className="position-absolute col-lg-4 top-0 start-50 border border-3 shadow shadow-3 mt-5">
      <h1 className="heading ms-5">Login Here</h1>

      <div>
        {error && <p className="alert alert-danger">{error}</p>}
        <form>
          <section>
            <label htmlFor="email" className="form-label ms-3">
              Email Id :
            </label>
            <input
              id="email"
              className="mt-4 ms-3 form-control w-75 p-3"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            ></input>
          </section>
          <br />
          <section>
            <label html for="password" className="form-label ms-3">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="mt-4 ms-3 form-control w-75 p-3"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
            ></input>
          </section>

          <button type="submit" className="mt-4 ms-5" onClick={handleSubmit}>
            SUBMIT
          </button>
        </form>
      </div>

      <h2 className="mt-5 ms-3">Don't have an account?</h2>
      <NavLink to="/register" className="ms-5">
        Sign Up
      </NavLink>
    </div>
  );
};

export default Login;
