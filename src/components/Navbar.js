import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo.svg";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from "../context";

 const  Navbar =() =>{
  
    return (
    <ProductConsumer>
         {value => {
          const { cartTotal, totalQwt } = value.state;

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
          <Link to="/cart" className="ml-auto">
            <ButtonContainer>
           { totalQwt ? <span style={{
                position: 'absolute',
                top: '1px',
                right: '41px',
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                background: 'gainsboro',
                fontSize: '14px'
              }}>{ totalQwt}</span>:''}
              <span className="mr-2">
                <i className="fas fa-cart-plus " />
              </span>
              {cartTotal ? `₹ ${cartTotal}`:''}
            </ButtonContainer>
          </Link>
        </Nav>
     )
    }}
    </ProductConsumer>
    );
  }


const Nav = styled.nav`
    background: #262626;
    .nav-link {
      color: var(--mainWhite) !important;
      font-size:1.3rem;
      text-transform:capitalize;
    }
    @media (max-width: 576px) {
      .navbar-nav {
        flex-direction: row !important;
  `;
  export default Navbar;

