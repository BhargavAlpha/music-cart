import React from 'react';
import './Signup.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img from '../../assets/heading.png';

const SignUp = () => {
  const navigate = useNavigate();
  const showToastSuccessMessage = () => {
    toast.success('Registered Successfully!', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showToastFailureMessage = (message = 'Fill all fields properly') => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const [formValues, setFromValues] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });

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

    console.log(valid);

    if (valid) {
      console.log('toast');
      axios
        .post(`https://musicart-80cn.onrender.com/register`, {
          name: formValues.name,
          mobile: formValues.mobile,
          email: formValues.email,
          password: formValues.password,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.name) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', formValues.email);
            console.log(response.data);
            showToastSuccessMessage();
            navigate('/');
          } else if (response.data.error) {
            // Check if the error message indicates that the user already exists
            if (response.data.error.includes('duplicate key')) {
              showToastFailureMessage('User with the same email already exists!');
            } else {
              showToastFailureMessage();
            }
          } else {
            showToastFailureMessage();
          }
        })
        .catch((error) => {
          showToastFailureMessage();
        });
    } else {
      showToastFailureMessage();
    }
  };

  return (
    <div className='login'>
      <div className='login-container'>
        <img src={img} alt='banner image' />
        <div>
          <form className='login-form'>
            <label className='heading'>Create Account</label>
            <div className='signUp-field'>
              <label className='form-itm'>Your name</label>
              <input
                style={{ paddingLeft: '0px' }}
                type='text'
                onChange={(e) => handleChange(e)}
                className='form-itm'
                name='name'
                autoComplete='name'
              ></input>
            </div>
            <div className='signUp-field'>
              <label className='form-itm'>Mobile number</label>
              <input
                type='text'
                style={{ paddingLeft: '0px' }}
                id='phone'
                name='mobile'
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='signUp-field'>
              <label className='form-itm'>Email</label>
              <input
                style={{ paddingLeft: '0px' }}
                type='email'
                onChange={(e) => handleChange(e)}
                className='form-itm'
                name='email'
                autoComplete='email'
              ></input>
            </div>
            <div className='signUp-field'>
              <label className='form-itm'>Password</label>
              <input
                style={{ paddingLeft: '0px' }}
                onChange={(e) => handleChange(e)}
                className='form-itm'
                type='password'
                name='password'
                autoComplete='current-password'
                value={formValues.pass}
              ></input>
            </div>
            <div className='signUp-field'>
              <input
                className='form-itm'
                id='form-btn'
                type='button'
                value='Continue'
                onClick={(e) => {
                  handleSubmit();
                }}
              ></input>
            </div>
            <p className='signUp-field'>
              By enrolling your mobile phone number, you consent to receive automated security
              notifications via text message from Musicart. Message and data rates may apply.
            </p>
          </form>
          <div className='already-sign-in'>
            Already have an account{' '}
            <button className='signin-btnn' onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
      <div className='bottom-container'>
        <b>Musicart | All rights reserved</b>
      </div>
    </div>
  );
};

export default SignUp;
