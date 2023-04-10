import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Homepage.css";
const Homepage = function () {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;

    setDetails((prev) => {
      console.log(prev);
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", details)
      .then((res) => {
        const token = res.data.data;
        console.log(token)
        setError("");
        localStorage.setItem("auth-token", `Bearer ${token}`);
        console.log(localStorage.getItem("auth-token"))
      })
      .catch((error) => {
        setError(error.response.data.message);
      });

   

  }

  return (
    <div>
      <h1 className="heading">Welcome to Homepage</h1>

      <div>
      {error && <p className="alert alert-danger">{error}</p>}
        <form>
          <section>
            <label htmlFor="email" className="email">
              Email Id :
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            ></input>
          </section>
          <br />
          <section>
            <label html for="password" className="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
            ></input>
          </section>

          <button type="submit" onClick={handleSubmit}>
            SUBMIT
          </button>
        </form>
      </div>

      <h2 className="f">Don't have an account?</h2>
      <NavLink to="/register">Sign Up</NavLink>
    </div>
  );
};

export default Homepage;
