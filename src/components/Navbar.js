import React, {useContext} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo.svg";
import { ButtonContainer } from "./Button";
import { ProductContext} from "../context";


 const  Navbar =() =>{
  const value = useContext(ProductContext);
  const { cartTotal, totalQwt,userEmail } = value.state;
    return (
        <Nav className="navbar navbar-expand-sm  navbar-dark px-sm-5">
          <Link to="/">
            <img src={logo} alt="store" className="navbar-brand" />
          </Link>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-5">
              <Link to="/" className="nav-link">
                products
              </Link>
            </li>
          </ul>
          <div className="navbar navbar-expand-sm  ml-auto">
            { userEmail.trim()? 
           <span  className="nav-item  navbar-brand usericon">
              <i className="far fa-user-circle"></i>
              <span className="welcome ml-2">Welcome</span>
              <span className="username ml-2">{userEmail}</span>
              </span>:''}
            <span> 
            <Link to="/cart" className="ml-auto">
         
         <ButtonContainer>
        { totalQwt ? <span className="cartcount">{ totalQwt}</span>:''}
           <span className="mr-2">
             <i className="fas fa-cart-plus " />
           </span>
           {cartTotal ? `₹ ${cartTotal}`:''}
         </ButtonContainer>
       </Link>
            </span>

        
        </div>
        </Nav>
     )
  }


const Nav = styled.nav`
    background: #262626;
    .nav-link {
      color: var(--mainWhite) !important;
      font-size:1.3rem;
      text-transform:capitalize;
    }
    li{
      list-style: none;

    }
    .fa-user-circle{
      font-size:30px;
      color: #a9a9a9;
      cursor: pointer;
      position: absolute;
       padding: 8px;
       display: block;
        width: 48px;
        height: 48px;
        left:-40px
    

    }
     .usericon {
      padding: 3px;
      display: flex;
      flex-direction: column;
      position: relative;
      height: 54px;
      min-width: 54px;
      color: inherit;
      border-radius: 2px;
      background: transparent;
      border: none;
  }
  .username, .welcome{
    color:white
  }

  .cartcount{
    position: absolute;
    top: 3px;
    right: 15px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: gainsboro;
    font-size: 14px;
  }
    @media (max-width: 576px) {
      .navbar-nav {
        flex-direction: row !important;
      }
  `;
  export default Navbar;

