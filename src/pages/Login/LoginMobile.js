import React from 'react';
import img from '../../assets/Group 30.png'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LoginMobile.css'

const LoginMobile = () => {

    const nav = useNavigate();
    const showToastSuccessMessage = () => {
        toast.success("Logged in Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
    
      }; // to show the Login  success toast message
      const showToastFailureMessage = () => {
        toast.error("Invalid Login !", {
          position: toast.POSITION.TOP_CENTER,
        }); // to show invalid login toast message
      };
    
  const [credentials, setCredentials] = useState({ input: '', password: '' });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleLogin = () => {
    const { input, password } = credentials;

    const loginData = { email: input, mobile: input, password };

  
    axios.post('https://musicart-80cn.onrender.com/login', loginData)
      .then((response) => {
       localStorage.setItem("token", response.data.token)
        console.log(response.data);
        showToastSuccessMessage();
        nav("/");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  
    return (
        <div>
           <div className='mobile-login-head'>   <img src={img} alt="banner image" /> </div>
           <br></br>
            <br></br>
           <div className='mobile-container'>
           
                <p className='welcome'>Welcome</p>

                <form  className='login-form'>
               <label className='heading'>Sign in</label>
                <div className='form-field'> <label className='form-itm'>Email/ phone number</label>
                <input
                     type="text"
                     onChange={(e) => handleInputChange(e)}
                     className="form-itm"
                      name="input"
                      autoComplete="mail" 
                  
              
                    
                  ></input> </div>
                <div className='form-field' >
                <label className='form-itm'>Password</label>
                   <input
                        onChange={(e) => handleInputChange(e)}
                        className="form-itm"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={credentials.password}

                     ></input>

                </div>
                <div className='form-field'>  <input 
                   className='form-itm'
                   id='form-btn'
                   type="button"
                   value="continue"
                   onClick={(e) => {
                    handleLogin();
                  
                  }}
                   ></input> </div>
                  <p className='form-field' >By continuing you agree to Musiccarts privacy notice and conditions of use</p>
              </form>
              <div id='hr-lines' > <hr /> <span>New to Musicart ? </span> <hr /> </div>
              <div className='crete-btn'> Create your account </div>





           </div>
           <div className='mobile-login-bottom' > <b>Musicart | All rights reserved</b> </div>
          
         
        </div>
    );
};

export default LoginMobile;