import React from "react"
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Homepage from "./components/Homepage/Homepage";
import Register from "./components/User/Register";
import User from "./components/User/User"
import Products from "./components/Products/Products";

const router = createBrowserRouter([
  {path: "/",
  element: <Homepage/>},
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/user/:id",
    element: <User/>
  },
  {
    path: "/products",
    element: <Products/>
  }

])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
