import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";
const Navbar = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } =useContext(MyContext);
  
  const logOut = ()=>{
    localStorage.removeItem("token");
    setLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    localStorage.removeItem("total");      
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
    else{
      setLoggedIn(false);
    }
  }, [setLoggedIn]);          // setLoggedIn is a dependency of useEffect

  return (
    <div className="header">
      {/* <span>  </span> */}
      <span><i className="ri-phone-line" ></i> 912121131313 </span>
      <span>Get 50% off on selected items | Shop Now</span>
      {loggedIn ? (
        <h3>
          <Link className="header_login_links" onClick={()=>{logOut();
            }}>logout</Link>
        </h3>
      ) : (
        <div>
          
          <Link className="header_login_links" to={'/login'}   >login</Link>
          <span className="header_login_links"> &nbsp; &nbsp; | &nbsp;&nbsp; </span>
          <Link className="header_login_links" to={'/register'}   >SignUp</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;