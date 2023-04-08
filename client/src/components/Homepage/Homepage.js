import { NavLink } from "react-router-dom";
import { useState } from "react";

const Homepage = function () {
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
    console.log(details);
    

  }


  return (
    <div>
      <h1>Welcome to Homepage</h1>

      <div>
        <form >
          <section>
            <label htmlFor="email">Email Id :</label>
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
            <label html for="password">
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

      <h2>Don't have an account?</h2>
      <NavLink to="/register">Sign Up</NavLink>
    </div>
  );
};

export default Homepage;
