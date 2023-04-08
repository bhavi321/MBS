import React from "react"
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Homepage from "./components/Homepage/Homepage";
import Register from "./components/Register/Register";

const router = createBrowserRouter([
  {path: "/",
  element: <Homepage/>},
  {
    path: "/register",
    element: <Register/>
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
