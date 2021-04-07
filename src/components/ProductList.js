import React , {useContext}from "react";
import Product from "./Product";
import Title from "./Title";
import styled from "styled-components";
import {  ProductContext} from "../context";
 const  ProductList =() =>{
   const value = useContext(ProductContext)
    return (
      <React.Fragment>
        <ProductWrapper className="py-5">
          <div className="container">
            <Title name="our" title="products" />
            <div className="row">
              {
                value.state.products.map(product => {
                    return <Product key={product.id} product={product} />;
                  })
                }
              
            </div>
          </div>
        </ProductWrapper>
      </React.Fragment>
    );
  }


const ProductWrapper = styled.section``;

export default  ProductList;
