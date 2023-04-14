import { Fragment, React, useEffect } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/User/Register";
import User from "./components/User/User";
import Bill from "./components/Bill/Bill";
import FetchBill from "./components/Bill/FetchBill";
import BillItemsByBillId from "./components/Bill/BillItemsByBillId";
import Products from "./components/Products/Products";
import Homepage from "./components/Homepage/Homepage";
import Headers from "./components/Headers/Headers";

function AR({ children }) {
  //authenticated routes
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) return navigate("/login");
  }, []);
  return children;
}

function App() {
  return (
    <Fragment>
      <Headers />
      <div>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route
            path="/user/"
            element={
              <AR>
                <User />
              </AR>
            }
          />
          <Route
            path="/bill"
            element={
              <AR>
                {" "}
                <Bill />
              </AR>
            }
          />
          <Route
            path="/bill/getBills"
            element={
              <AR>
                {" "}
                <FetchBill />
              </AR>
            }
          />
          <Route
            path="/billItem/:id"
            element={
              <AR>
                {" "}
                <BillItemsByBillId />
              </AR>
            }
          />
          <Route
            path="/productss"
            element={
              <AR>
                {" "}
                <Products />
              </AR>
            }
          />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;

// const router = createBrowserRouter([
//   {
//     path: "",
//     element: <Homepage/>
//   },
//   {
//     path: "/login",
//   element: <Login/>},
//   {
//     path: "/register",
//     element: <Register/>
//   },
//   {
//     path: "/homepage",
//     element: <Homepage/>
//   },
//   {
//     path: "/user/:id",
//     element: <AR><User/></AR>
//   },
//   {
//     path: "/products",
//     element: <AR><Products/></AR>
//   }

// ])
