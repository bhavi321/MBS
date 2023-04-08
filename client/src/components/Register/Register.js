import { Fragment, React } from "react";
import './Register.css'
import { useState } from "react";
import axios from "axios";

function Register(){

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

    async function handleSubmit(e){
        e.preventDefault()
       const res = await axios.post("http://localhost:3001/register",details)
       window.alert("Login Success")
       console.log(res.data.data)
    }


    return(
    <Fragment>
        <div className = "outer">

       
   <div className = "box">
<h1 className = "h me-4" >REGISTER HERE</h1>
    <form>

    <div className="fields mb-3 mt-4">
    <label htmlFor="userName" className="form-label">User Name</label>
    <input type="text" className="form-control" id="userName"  name="userName" onChange={handleChange}/>
  </div>
  <div className="fields mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange}/>
    
  </div>
  <div className="fields mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange}/>
  </div>
  
  <div className="fields mb-3">
    <label htmlFor="type" className="form-label">type</label>
    <input type="text" className="form-control" id="type" name="type" onChange={handleChange}/>
  </div>

  <button type="submit" className="btn btn-primary mb-3" onClick={handleSubmit}>Submit</button>
</form>
   </div>
   </div>
   </Fragment>
    
    )
};

export default Register;