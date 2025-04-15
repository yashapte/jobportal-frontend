import Login from '../Lg/Login.js'
import Register from '../Register/Register'
import React, { useState } from 'react';
function Home () {
const [action, setAction] = useState(null);


 const handleevent=(e)=>{
    e.preventDefault();
 }

 const handleregister=(e)=>{
  handleevent(e);
  setAction(!action);

 }
return(

    <>
      {action?<Register/>:<Login/>}
      </>
)}
export default Home; 