import React from "react";
import CartItem from "./CartItem";
const CartList = (props) => {
  
    const { value } = props;
    const { cart } = props.value.state;
    return (
      <div className="container-fluid">
        {cart.map(item => (
          <CartItem key={item.id} item={item} value={value} />
        ))}
      </div>
    );
  
}

export default CartList;
