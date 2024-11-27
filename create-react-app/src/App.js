{/* contains two api calls */}

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Navbar from "./components/navbar/index.js";

import URL from './components/config/index.js' // Server URL
import Menu from './components/menu/index.js'
import Cart from './components/cart/index.js'
import Login from './components/login/index.js'
import Register from './components/register/index.js'
import * as jose from 'jose'

//stripe
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import PaymentSuccess from "./components/stripe/payment_success.js";
import PaymentError from "./components/stripe/payment_error.js";

//magicLink || Account Recovery
import Enter from './components/accountRecovery/index.js'
import AccountRecovery from "./components/accountRecovery/index.js"

function App() {

  const [user, setUser] = useState(null);
  const [myCart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  //products from db
  const [MenuList, setMenu] = useState([]);
  //stripe
  const apiKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
  const stripePromise = loadStripe(apiKey);
  //Account Recovery
  const [msg, setMsg] = useState('');
  const sendEmail = async (paramEmail, magicLink) => {
    axios.post(URL+'/Guest/sendEmail', {email: paramEmail, magicLink})
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
    const getMenu = async () => {
    try{
      const response = await axios.get(URL+'/Products/');
      //console.log(response)
      setMenu(response.data);
    }catch(e){  
      console.log("request to " + URL + "failed")
      console.log(e)
    }
  }
  getMenu();


  //Verify LocalStorage token
  const verify_token = async () => {
    try {
      if(!token){
        setUser("guest@gmail.com");
        console.log("token not found")
      } else {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(URL+'/Guest/verifyToken');
        //console.log(response);
        return response.data.ok ? loginHandle(token) : logout();
      }
    }catch(error){
      console.log(error)
    }
  }
  verify_token();

}, [])

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

  return (
    <Router>
      <Navbar/>
      <Routes>

        <Route 
        path={'/'}
        element={<Menu MenuList={MenuList} logout={logout} setCart={setCart} user={user}/>}
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
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
