import React from "react"
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Homepage from "./components/Homepage/Homepage";


const router = createBrowserRouter([
  {path: "/",
  element: <Homepage/>}

])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
