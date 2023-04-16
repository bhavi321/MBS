import axios from "axios";
import { React, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Bill from "./components/Bill/Bill";
import BillItemsByBillId from "./components/Bill/BillItemsByBillId";
import FetchBill from "./components/Bill/FetchBill";
import Headers from "./components/Headers/Headers";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import FetchProducts from "./components/Products/FetchProducts";
import Products from "./components/Products/Products";
import UpdateProducts from "./components/Products/UpdateProducts";
import Register from "./components/User/Register";
import User from "./components/User/User";
import AuthContextProvider from "./contexts/AuthContextProvider";

function AR({ children }) {
  //authenticated routes
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) return navigate("/login");
  }, []);
  return children;
}
export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

function App() {
  return (
    <AuthContextProvider>
      <Headers />
      <div>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route
            path="/user"
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
          <Route
            path="/products"
            element={
              <AR>
                {" "}
                <FetchProducts />
              </AR>
            }
          />

          <Route
            path="/products/update/:id"
            element={
              <AR>
                {" "}
                <UpdateProducts />
              </AR>
            }
          />
        </Routes>
      </div>
    </AuthContextProvider>
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
