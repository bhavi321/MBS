import { Fragment, React } from "react";
import './Register.css'
import { useState } from "react";
import axios from "axios";

function Register(){
const [error,setError] = useState("")
    const [details,setDetails] = useState({
        userName:"",
        email:"",
        password:"",
        type:""
    })

    function handleChange(e){
        const {name,value} = e.target
        setDetails((prev)=>{
            return{...prev,[name]:value}
        })
    }

    function handleSubmit(e){
        e.preventDefault()
       axios.post("http://localhost:3001/register",details).then((response)=>{console.log(response.data.data)})
       .catch((error)=>{setError(error.response.data.error.details[0].message)})
      //error.response.data.error.details
    }
    return(
    <Fragment>
        <div className = "">

       
   <div className = "container col-lg-3 col-5 shadow p-4 rounded">
<h1 className="text-white">REGISTER HERE</h1><hr className="text-white"/>
{error && <p className="alert alert-danger">{error}</p>}
    <form>

    <div className="form-group mt-3 mt-4">
    <label htmlFor="userName" className="form-label text-white " >User Name</label>
    <input type="text" className="form-control" id="userName"  name="userName" onChange={handleChange}/>
  </div>
  <div className="form-group mt-3">
    <label htmlFor="exampleInputEmail1" className="form-label text-white " >Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange}/>
    
  </div>
  <div className="form-group mt-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-white " >Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange}/>
  </div>
  
  <div className="form-group mt-3">
    <label htmlFor="type" className="form-label text-white " >Type</label>
    <input type="text" className="form-control " id="type" name="type" onChange={handleChange}/>
  </div>

  <input type="submit" className="form-control btn btn-success  mt-4" onClick={handleSubmit}></input>
</form>
   </div>
   </div>
   </Fragment>
    
    )
};

export default Register;