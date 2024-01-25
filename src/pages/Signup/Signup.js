import React from "react";
import styles from "./Signup.module.css";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mobimg from "../../assets/heading.png";
import Footer from "../../components/footer/Footer";

const SignUp = () => {
  const navigate = useNavigate();
  const showToastSuccessMessage = () => {
    toast.success("Registered Successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const showToastFailureMessage = (message = "Fill all fields properly") => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const [formValues, setFromValues] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [mailError, setMailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const handleInputChange = (e) => {
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
      console.log("toast");
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
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", formValues.email);
            console.log(response.data);
            showToastSuccessMessage();
            navigate("/");
          } else if (response.data.error) {
            // Check if the error message indicates that the user already exists
            if (response.data.error.includes("duplicate key")) {
              showToastFailureMessage(
                "User with the same email already exists!"
              );
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
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <>
    {isSmallScreen?(<div className={styles.mobContainer}>
        <div className={styles.mobCenterContainer}>
          <div className={styles.mobLogo}>
            <img src={mobimg} alt="logo" />
            <p>Musicart</p>
          </div>
        </div>
        <h1 className={styles.mobWelcome}>Welcome</h1>
          <div className={styles.mobSigninDiv}>
            <p >Create Account</p>
            <div>
            <p className={styles.label}>Your Name</p>
            <input
              type="text"
              className={styles.inputs}
              name="input"
              autoComplete="mail"
              value={formValues.input}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className={styles.label}>Mobile Number</p>
            <input
              type="password"
              className={styles.inputs}
              name="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className={styles.label}>Email Id</p>
            <input
              type="password"
              className={styles.inputs}
              name="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p className={styles.label}>Password</p>
            <input
              type="password"
              className={styles.inputs}
              name="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <p> By enrolling your mobile phone number, you consent to receive automated
        security notifications via text message from Musicart. Message and data
        rates may apply.</p>
          <button className={styles.continueBtn} onClick={handleSubmit}>
            Continue
          </button>
          <p className={styles.policy}>
            By continuing, you agree to Musicart privacy notice and conditions of
            use.
          </p> 
          </div>
          <p>Already have an account?<button className={styles.siginBtn} onClick={()=>navigate('/login')}>Sign in</button> </p>

        
        <Footer />
      </div>):

    (<div className={styles.container}>
    <div className={styles.centerContainer}>
      <div className={styles.logo}>
        <img src={mobimg} alt="logo" />
      </div>
    </div>
    <div className={styles.signinDiv}>
      <h1>Create Account</h1>
      <div>
        <p className={styles.label}>Your Name</p>
        <input
          type="text"
          className={styles.inputs}
          onChange={(e) => handleInputChange(e)}
          name="name"
          autoComplete="name"
          value={formValues.name}
        />
      </div>
      <div>
        <p className={styles.label}>Mobile Number</p>
        <input
          type="number"
          className={styles.inputs}
          name="mobile"
          onChange={(e) => handleInputChange(e)}
          value={formValues.mobile}
        />
      </div>
      <div>
          <p className={styles.label}>Email Id</p>
          <input
            type="email"
            className={styles.inputs}
            onChange={(e) => handleInputChange(e)}
            name="email"
            autoComplete="email"
            value={formValues.email}
          />
        </div>
        <div>
        <p className={styles.label}>Password</p>
        <input
          className={styles.inputs}
          onChange={(e) => handleInputChange(e)}
          type="password"
          name="password"
          autoComplete="current-password"
          value={formValues.pass}
        />
        </div>
      <p>
        By enrolling your mobile phone number, you consent to receive automated
        security notifications via text message from Musicart. Message and data
        rates may apply.
      </p>
      <button className={styles.continueBtn} onClick={handleSubmit}>Continue</button>
      <p className={styles.policy}>
        By continuing, you agree to Musicart privacy notice and conditions of
        use.
      </p>
    </div>
    <p>Already have an account?<button className={styles.siginBtn} onClick={()=>navigate('/login')}>Sign in</button> </p>
    <Footer />
  </div>)}
  
  </>
  );
};

export default SignUp;
