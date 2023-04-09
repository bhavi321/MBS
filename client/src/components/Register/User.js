import { Fragment, React, useEffect } from "react";
//import './User.css'
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



function User(){
    const [user,setUser] = useState()

    const params = useParams()

useEffect(()=>{
    axios.get(`http://localhost:3001/user/${params}`,{withCredentials:true}).then((response)=>{
    console.log(response.data.data)
   })
},[])
    return <pre>{JSON.stringify(user,null,2)}</pre>
}

export default User