import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import img from '../../assets/heading.png';

const Login = () => {
  const nav = useNavigate();

  const showToastSuccessMessage = () => {
    toast.success('Logged in Successfully!', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showToastFailureMessage = () => {
    toast.error('Invalid Login!', {
      position: toast.POSITION.TOP_CENTER,
    });
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

    axios
      .post('https://musicart-80cn.onrender.com/login', loginData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', input);
        console.log(response.data);
        showToastSuccessMessage();
        nav('/');
      })
      .catch((err) => {
        setError(err.response.data.error);
        showToastFailureMessage(); // Show error toast
      });
  };

  function navigateRegister() {
    nav('/register');
  }

  return (
    <div>
      <div className="login-container">
        <img src={img} alt="banner image" />
        <div>
          <form className="login-form">
            <label className="heading">Sign in</label>
            <label className="form-itm">Enter your Email or mobile number</label>
            <input
              style={{ paddingLeft: '0px' }}
              type="email"
              className="form-itm"
              name="input"
              autoComplete="mail"
              value={credentials.input}
              onChange={handleInputChange}
            ></input>
            <label className="form-itm">Password</label>
            <input
              style={{ paddingLeft: '0px' }}
              className="form-itm"
              type="password"
              name="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleInputChange}
            ></input>
            <input id="form-btn" type="button" value="Continue" onClick={handleLogin}></input>
            {error && <p className="form-field">{error}</p>}
            <p className="form-field">
              By continuing you agree to Musiccarts privacy notice and conditions of use
            </p>
          </form>
          <div className="hr-lines">
            <hr className="left-line" />
            <span>New to Musicart ?</span>
            <hr className="right-line" />
          </div>
          <br />
          <br />
          <div className="create-btn" onClick={navigateRegister}>
            {' '}
            Create your Musiccart account{' '}
          </div>
        </div>
        <ToastContainer />
      </div>
      <div className="bottom-container"> <b>Musicart | All rights reserved</b> </div>
    </div>
  );
};

export default Login;
