import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import axios from "axios";
import React, {useEffect, useState} from "react";


//components

import Navbar from "./components/Navbar";
import Menu from './components/Menu'
import Cart from './components/Cart'
import Login from './components/Login'
import Register from './components/Register'
import AccountRecovery from "./components/AccountRecovery"


//stripe
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import PaymentSuccess from "./components/stripeJs/payment_success";
import PaymentError from "./components/stripeJs/payment_error";

//magicLink || Account Recovery
import Enter from './components/magic-link/Enter'


import * as jose from 'jose'

function App() {

  const URL = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

  //json-web-token
    const [user, setUser] = useState(null);
    const [myCart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
    
    let logout = () => {
      localStorage.removeItem("token");
      setUser('guest@gmail.com');
      setIsLoggedIn(false);
      setCart([]);
      alert("You have logged out");
    }
    
    /* token section of this code could be revised */
    
    let loginHandle = (token) => {
      let decodedToken = jose.decodeJwt(token);
      setUser(decodedToken.username);
      (decodedToken.cart.length > 0) ? setCart(decodedToken.cart) : setCart([])
      setIsLoggedIn(true);
      localStorage.setItem("token", JSON.stringify(token));
    }
  

  //mongoDb
  const [MenuList, setMenu] = useState([]);

  //stripe
  const apiKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe(apiKey);

  //magic-link
  const [msg, setMsg] = useState('');
  
  const sendEmail = async (paramEmail, magicLink) => {
    axios.post(URL+'/jwt-users/sendEmail', {email: paramEmail, magicLink})
    .then((res) => {
      if(res.data.ok)
      {
        loginHandle(res.data.token)
      }
      else{
        setMsg(res.data.message)
    }})
    .catch((err)=>{
    console.log(err)
    })
    
  }

useEffect(()=> {
    //Get menuItems from Mongodb
    const fetchData = async () => {
    try{
      const response = await axios.get(URL+'/Products/');
      //console.log(response)
      setMenu(response.data);
    }catch(e){  
      console.log(e)
    }
  }
  fetchData();


  //Verify LocalStorage token
  const verify_token = async () => {
    try {
      if(!token){
        setUser("guest@gmail.com");
        console.log("token not found")
      } else {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(URL+'/jwt-users/verifyToken');
        //console.log(response);
        return response.data.ok ? loginHandle(token) : logout();
      }
    }catch(error){
      console.log(error)
    }
  }
  verify_token();

}, [])


  return (
    <Router>
      <Navbar/>
      <Routes>

        <Route 
        path={'/'}
        element={
          <Menu 
            MenuList={MenuList} 
            logout={logout} 
            setCart={setCart} 
            user={user}/>}
        />

        <Route
        path={'/Cart'}
        element={
          <Elements stripe={stripePromise}>
            <Cart myCart={myCart} setCart={setCart} user={user} />
          </Elements>
        }

        />
        <Route
        path={'/Login'}
        element={<Login loginHandle={loginHandle}/>}
        />

        <Route
        path={'/Register'}
        element={<Register loginHandle={loginHandle}/>}
        />

        <Route
          path="/payment/success"
          element={<PaymentSuccess
          setCart={setCart} 
          />}
        />

        <Route
          path="/payment/error"
          element={<PaymentError />}
        />

        <Route
          path="/AccountRecovery"
          element={<AccountRecovery 
          sendEmail={sendEmail}
          msg={msg}
          />}
        />

        <Route
            path="sendEmail/:email/:link"
            element={<Enter sendEmail={sendEmail} />}
          />
      
      </Routes>
    </Router>
  );
}

export default App;
