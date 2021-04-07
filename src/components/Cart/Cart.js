import React, {useContext} from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import {ProductContext} from "../../context";
import EmptyCart from "./EmptyCart";
 const Store =(props) =>{
  const value = useContext(ProductContext);
  const { cart } = value.state;

    return (
      <section>
         {
          cart.length > 0 ? 
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} history={props.history} />
                </React.Fragment>:
              <EmptyCart />
            
            }
      </section>
    );
  }

export default   Store;