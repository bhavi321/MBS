import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Headers() {
 
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div>
        <a className="navbar-brand" href="">
      <img src="https://images.cdn3.stockunlimited.net/clipart450/bill_1242837.jpg" alt="Logo" width="38" height="39" className="d-inline-block align-text-center "/>
      My Invoice
    </a>
    </div>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {localStorage.getItem("auth-token")?(
              <Fragment>
                <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Bill
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/bill"}>
                      Create Bill{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/bill/getBills"}>
                      Fetch Bills
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/user"}>
                  Users
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </a>
              <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/productss"}>
                      Create Product{" "}
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={"/products"}>
                      Fetch Products
                    </Link>
                  </li>

                </ul>
                </li> </Fragment>):<span></span>}
              
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </li>
              
            </ul>

          </div>
          <Link className="me-5 nav-link" to={"/login"} onClick={()=>localStorage.clear()}>Logout</Link>
        </div>
      </nav>
    </div>
  );
}
