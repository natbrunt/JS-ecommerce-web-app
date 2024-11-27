import React from 'react'

const calculate_total = () => {
  let total = 0;
  props.cart.forEach((ele) => (total += ele.quantity * ele.price));
  total = parseFloat(total * .01).toFixed(2);
  return total;
};


export default cartCofig