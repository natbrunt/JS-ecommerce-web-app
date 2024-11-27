{/* contains two api calls */}
import React, {useState} from "react";
import axios from 'axios';
import URL from '../config'
import { FaTrashAlt } from "react-icons/fa";
import * as jose from 'jose'
import { useNavigate } from "react-router-dom";
import { useStripe } from "@stripe/react-stripe-js";
import stripeImg from '../assets/stripeImg.png'

let Cart = ({myCart, setCart, user}) => {


//stripe
const navigate = useNavigate();
const stripe = useStripe();
const [showInstructions, setInstru] = useState(false)

const createCheckoutSession = async () => {
    try {
      const response = await axios.post(
        URL+`/payment/create-checkout-session`,
        { list: myCart, username: user }
      );
      if(response.data.ok){
        localStorage.setItem(
          "sessionId",
          JSON.stringify(response.data.sessionId)
        )
      console.log("clear cart function")
      let decodedToken = jose.decodeJwt(response.data.token);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      redirect(response.data.sessionId)
      }
      else {
        navigate("/payment/error");
      }
    } catch (error) {
      navigate("/payment/error");
    }
  };

const redirect = (sessionId) => {
   
    stripe
      .redirectToCheckout({
        sessionId: sessionId,
      })
      .then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });
  };


const calculate_total = () => {
    let total = 0;
    myCart.forEach((ele) => (total += ele.quantity * ele.price));
    total = parseFloat(total * .01).toFixed(2);
    return total;
    };

const deleteCartItem = async(prodId) => {
    try {
        const res = await axios.post(URL+'/Guest/deleteCartItem',{username: user, id: prodId})
        if(res.data.ok == true){
            let decodedToken = jose.decodeJwt(res.data.token);
            setCart(decodedToken.cart)
            localStorage.setItem("token", JSON.stringify(res.data.token));
        } 
        else{
            console.log(res.data.error)
        }
    } catch (error) {
        console.log(error)
    }
} 



/*

cartItem ({
  image: {type: Array, required: false},
  name: {type: String, required: true},
  description: {type: String, required: false},
  price: {type: Number, required: true},
  quantity: {type: Number, required: false},
  id: unique uuid
});

*/


return(
<div className='flex flex-col items-center gap-4'>
<h1 className="font-bold text-7xl mt-3">Cart</h1>
<p className="w-96 text-center">Developer note - the guest cart is shared across platforms via Mongodb for demonstration purposes</p>

{myCart.length > 0 && myCart.map((data, idx) => {
    let thisPrice = parseFloat(data.price * .01).toFixed(2);
    return(
        <div key={idx} className="flex flex-col items-center">
            <img className='w-64 rounded-3xl' src={URL+"/assets/"+data.image}/>
            <button className='hover:bg-slate-500 bg-slate-400 text-black p-3 absolute mt-48 ml-48 rounded-3xl' 
                    onClick={() => deleteCartItem(data.id)}><FaTrashAlt size={"28px"}/></button>	
            <div className="flex items-center gap-2 justify-between w-48 mb-2 mt-1">
            <h1>{data.name}</h1>
            <div className="flex flex-row items-center gap-2">
                <h1>{thisPrice}</h1>
                <h1>{data.quantity}</h1>
            </div>
            </div>

        </div>
    )
})}
<h1>Total {calculate_total()} €</h1>
<button 
className="bg-slate-400 text-black hover:bg-slate-500 p-3 text-3xl rounded-3xl italic pr-4"
onClick={()=> createCheckoutSession()}>STRIPE</button>

<div className='flex flex-row items-center justify-center cursor-pointer mt-3
     bg-slate-300 w-24 h-24 pr-1 rounded-full bottom-1 right-1 fixed' onClick={() => navigate('/Cart')}>
        <h1>Total {calculate_total()} €</h1>
</div>

<button
  className="bg-slate-400 text-black hover:bg-slate-500 p-3 text-3xl mb-1 rounded-3xl italic pr-4"
  onClick={()=>setInstru(true)}
>How does this work?</button>

{showInstructions && 
<div className="flex flex-col items-center gap-y-4">
  <p className="w-96 text-center mt-3 italic">For the demo use 4242 for the card number,
    expiration date and cvc.  Enter any details 
    for personal info, Stripe here is only for demonstration.
  </p>
  <p className="italic font-bold">For example</p>
  <img src={stripeImg} className="border-2 rounded-3xl mb-1 w-3/4"></img>
</div>
}
</div>
)
}
export default Cart