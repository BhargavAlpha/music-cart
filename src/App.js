import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServerStatus from './components/serverStatus/ServerStatus';
import NotFound from './components/Error/NotFound';
import Home from "./pages/Home/Home";
import ProductView from './components/productCard/ProductCard';
import Success from './components/success/Success';
import ViewCart from './components/cart/ViewCart';
import { MyContext } from './context/MyContext';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ProductViewMobile from './components/productCard/ProductviewMobile';
 import Login from './pages/Login/Login';
 import LoginMobile from './pages/Login/LoginMobile';
 import SignUp from './pages/Signup/Signup';
 import SignUpMobile from './pages/Signup/SignupMobile';
import SignupMobile from './pages/Signup/SignupMobile';
import Cart from './components/cart/Cart';
import Checkout from './pages/Checkout/Checkout';

function App() {
  const [loggedIn , setLoggedIn] = useState(true);
  const [currentPage, setCurrentpage] = useState("home");
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  return (
    <MyContext.Provider value={{loggedIn , setLoggedIn,currentPage, setCurrentpage}}  >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ isDesktopOrLaptop ?<Login/> :<LoginMobile/>} />
          <Route path="/register" element={ isDesktopOrLaptop ?<SignUp/> :<SignupMobile/>} />
          <Route path="/" element={<Home />} />
          <Route path="/health" element={<ServerStatus />} />
          <Route path="/login" element={ isDesktopOrLaptop ?<Login/> :<LoginMobile/>} />
          <Route path="/register" element={ isDesktopOrLaptop ?<SignUp/> :<SignUpMobile/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/viewProduct" element={ isDesktopOrLaptop ?<ProductView/> : <ProductViewMobile/>} />
          <Route path="/viewCart" element={<ViewCart />} />
          <Route path="/Cart-items" element={<Cart/>}  />
          <Route path="/checkout" element={<Checkout/>}  />
          <Route path="/congrats" element={<Success />} />

        </Routes>
        
      </Router>
      </MyContext.Provider>
 
  );
}

export default App;