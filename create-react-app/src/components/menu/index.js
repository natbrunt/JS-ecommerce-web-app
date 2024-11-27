import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import URL from '../config/index'
import axios from 'axios'
import * as jose from 'jose'
import { FaShoppingCart } from "react-icons/fa";

let Menu = ({MenuList, setCart, user, logout}) => {

    let navigate = useNavigate()
    

    /* JavaScript is expecting to get a list of objects to display
    
        Each item in the database should be sent by post man to the local server (which will then send it to MongoDB Atlas) in the format
        {
            name: <string>,
            image: <string>, // src is determined by the config.js, all you need to do is declare the img name
            price: <int> (multiply the price by 100),
            description: <string>,
            quantity: <int>
        }
    
    */
    let [isHovering, setIsHovering] = useState({})
	let renderProducts=()=>(
        MenuList.map((prod,idx)=>{
        let thisPrice = parseFloat(prod.price * .01).toFixed(2);
        const handleMouseEnter = () => setIsHovering({ ...isHovering, [idx]: true });
        const handleMouseLeave = () => setIsHovering({ ...isHovering, [idx]: false });
  
        return(
            <div key={idx} className="flex flex-col items-center mb-3">
            
            {/* a hover add to cart text would look best on the img */}
            <img 
                className="w-72 h-72 rounded-3xl cursor-pointer" 
                src={URL+"/assets/" + prod.image}
                onMouseEnter={() => setIsHovering({ ...isHovering, [idx]: true })}
                onMouseLeave={() => setIsHovering({ ...isHovering, [idx]: false })}>
            </img>

            {isHovering[idx] && (
            <div className="absolute mt-32"
            onMouseEnter={() => setIsHovering({ ...isHovering, [idx]: true })}
            >
                <button className=' bg-slate-300 hover:bg-slate-500
              text-black font-bold p-3 rounded-3xl' 
                onClick={() => AddToCart(idx)}>Add to cart</button>	
            </div>
            )}

            <div id="name + addToCart button"
            className="flex flex-row items-center justify-between gap-x-20 mt-1">
                <div className="text-2xl" ><b>{prod.name.charAt(0).toUpperCase()+ prod.name.slice(1)}</b></div>
                
            </div>
            
            
            <p style={{ fontSize: '22px'}}><b>{thisPrice}€</b></p>
            <p className="w-96 text-center" >{prod.description}</p>
            <p className='italic'>Quantity: {prod.quantity}</p>

            </div>
        )
        })
    )

    let AddToCart = (number) =>
    {
    if(user != null){
    //get menuItem data from mongoDb
    let menuItem = {}
    menuItem = MenuList[parseInt(number)];
    //setCart with the newCart data using a token to store it in LocalStorage
    axios.post(URL+'/Guest/addItem', 
        {username:user, product: menuItem})
    .then((res) => {
        let decodedToken = jose.decodeJwt(res.data.token);
        (decodedToken.cart.length > 0) && setCart(decodedToken.cart)
        localStorage.setItem("token", JSON.stringify(res.data.token));
    })
    .catch((err)=>{
        console.log(err)
    })
    }
    else{
    alert("Please login to continue")
    }

    }

	
    return (
	<>
    <div className='flex flex-row items-center justify-center cursor-pointer mt-3
     bg-slate-300 hover:bg-slate-500 w-24 h-24 pr-1 rounded-full bottom-1 right-1 fixed' onClick={() => navigate('/Cart')}>
        <FaShoppingCart size={"32px"}/>
    </div>
    <div className='flex flex-col items-center'>
        <div className='flex flex-row gap-2 items-center justify-center mt-2 mb-2'>
            <h1 className='mb-3 mt-3'>Hello, {user}</h1>
            {(user == 'guest@gmail.com')? <button className='bg-slate-300 hover:bg-slate-400 p-4 rounded-3xl text-black font-bold' onClick={() => navigate('/Login')}>Log in</button> : <button  
            className='bg-slate-400 p-4 rounded-3xl text-black' onClick={()=>logout()}>Logout</button>}
        </div>
        <h1 className='font-bold italic text-4xl mb-3'>Entrees</h1>
	</div>
	{MenuList.length > 0 && renderProducts()}

	
    </>)
}

export default Menu