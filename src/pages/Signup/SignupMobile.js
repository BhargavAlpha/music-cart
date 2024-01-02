import React from 'react';
// import React from 'react';
import img from '../../assets/Group 30.png'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './SignupMobile.css'

const SignupMobile = () => {
    const navigate = useNavigate();
    const showToastSuccessMessage = () => {
      toast.success("Registered Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
  
    }; // to show the Login  success toast message
    const showToastFailureMessage = () => {
      toast.error("Fill all fields properly Login !", {
        position: toast.POSITION.TOP_CENTER,
      }); // to show invalid login toast message
    };
  
  
  const [formValues, setFromValues] = useState({ name:"",mobile:"",email:"",password:"" }); //to store the values from the user
  
  const [mailError, setMailError] = useState(false);
  const [passError, setPassError] = useState(false);
  
  const handleChange = (e) => {
      setFromValues({ ...formValues, [e.target.name]: e.target.value });
    };
    let valid = true;
    const handleSubmit = () => {
      console.log(formValues);
      if (!(formValues.email.trim().length > 0)) {
        setMailError(true);
        valid = false;
      } else {
        setMailError(false);
      }
  
      if (!(formValues.password.trim().length > 0)) {
        setPassError(true);
        valid = false;
      } else {
        setPassError(false);
      }
     
      console.log(valid)
      if (valid) {
          console.log("toast");
          axios
            .post(`http://localhost:4500/register`, {
              name:formValues.name,
              mobile:formValues.mobile,
              email:formValues.email,
              password:formValues.password,
            })
            .then((response) => {
              // setLogin(divue);
              console.log(response.data);
              if (response.data.name) {
               
                localStorage.setItem("token", response.data.token);
  
                console.log(response.data);
                showToastSuccessMessage();
                navigate('/');
              
              //   setInvalidMsg("");
              //   setText(false);
                
              } else {
              //   setInvalidMsg("please enter valid username");
                showToastFailureMessage();
              }
            })
         
      }
      else{
          showToastFailureMessage();
      }
    };  
     
    return (
        <div>
            {/* <h1>Mobile sign up!</h1> */}
            <div className='mobile-login-head'>   <img src={img} alt="banner image" /> </div>
            <br></br>
            <br></br>
           <div className='mobile-container'>
                <p className='welcome'>Welcome</p>

                <form  className='login-form'>
               <label className='heading'>Sign in</label>
               <div className='signUp-field'> <label className='form-itm'>Your name</label>
             <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  className="form-itm"
                   name="name"
                   autoComplete="name" 
               
           
                 
               ></input> </div>
                <div className='signUp-field'> <label className='form-itm'>Mobile number</label>
            
                 <input type="text" id="phone" name="mobile"  onChange={(e) => handleChange(e)}  />
    
               
               </div>
             <div className='signUp-field'> <label className='form-itm'>Email</label>
             <input
                  type="email"
                  onChange={(e) => handleChange(e)}
                  className="form-itm"
                   name="email"
                   autoComplete="mail" 
               
           
                 
               ></input> </div>
             <div className='signUp-field' >
             <label className='form-itm'>Password</label>
                <input
                     onChange={(e) => handleChange(e)}
                     className="form-itm"
                     type="password"
                     name="password"
                     autoComplete="current-password"
                     value={formValues.password}

                  ></input>

             </div>
             <div className='signUp-field'>  <input 
                className='form-itm'
                id='form-btn'
                type="button"
                value="continue"
                onClick={(e) => {
                 handleSubmit();
               
               }}
                ></input> </div>
                  <p className='form-field' >By continuing you agree to Musiccarts privacy notice and conditions of use</p>
              </form>
              <div className='already-sign-in' id='already' >Already have an account <a href="">Sign In</a></div>



           </div>
           <div className='mobile-login-bottom' > <b>Musicart | All rights reserved</b> </div>
          
         

        </div>
    );
};

export default SignupMobile;