import React from 'react';
import './Navbar.css';
import Call from '../../Assets/Call.png';
function Navbar() {
  return (
    <div className='Navbar'>
        <div className='call-info'>
          <img src={Call} alt='Call-logo'/>
          <span>912121131313</span>
        </div>
        <div className='shop-now'>
            Get 50% off on Selected Items  &nbsp; &nbsp;| &nbsp; Shop Now
        </div>
        <div className='login-status'>
            <button className='btn'>Login</button>
            <span> | </span>
            <button className='btn'>Signup</button>
        </div>
    </div>
  )
}

export default Navbar