import React from "react";
import { Link } from "react-router-dom";
const CartTotals =(props) => {
    const {
       
      cartTotal,
      cart,
      totalQwt,
      userEmail
    } = props.value.state;
    const emptyCart = cart.length === 0 ? true : false;
    return (
      <React.Fragment>
        {!emptyCart && (
          <div className="container">
            <div className="row">
              <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                <Link to="/">
                  <button
                    className="btn btn-outline-danger text-uppercase mb-3 px-5"
                    type="button"
                    onClick={() => {
                      props.value.clearCart();
                    }}
                  >
                    clear cart
                  </button>
                </Link>
                
                <h5>
                  <span  > total Quentity:</span>{" "}
                  <strong>₹ {totalQwt} </strong>
                </h5>
                <h5>
                  <span  > total :</span>{" "}
                  <strong>₹ {cartTotal} </strong>
                </h5>
                <h5>
                  <span  > User Email :</span>{" "}
                  <strong>{userEmail} </strong>
                </h5>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

export default   CartTotals;