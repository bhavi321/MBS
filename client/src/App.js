import {React,useEffect} from "react"
import './App.css';
import {createBrowserRouter,RouterProvider,useNavigate} from "react-router-dom"
import Login from "./components/Login/Login";
import Register from "./components/User/Register";
import User from "./components/User/User"
import Products from "./components/Products/Products";
import Homepage from "./components/Homepage/Homepage";
import Headers from "./components/Headers/Headers";


function AR({children}){  //authenticated routes
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("auth-token"))
   return navigate("/login")
  },[])
return children
}

const router = createBrowserRouter([
  {path: "/login",
  element: <Login/>},
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/homepage",
    element: <Homepage/>
  },
  {
    path: "/user/:id",
    element: <AR><User/></AR>
  },
  {
    path: "/products",
    element: <AR><Products/></AR>
  }

])

function App() {
  return (
    
    <div className="App">
      <Headers/>
      <RouterProvider router={router}/>
    </div> 
  );
}

export default App;
