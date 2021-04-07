import React, { useState ,useEffect ,createContext} from "react";
import { storeProducts, detailProduct } from "./data";
export const ProductContext = createContext();

  const ProductProvider = (props) =>{
    const [state, setState] = useState(
      {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        //cartSubTotal: 0,
        //cartTax: 0,
        cartTotal: 0,
        isLoggIn: false,
        login:false,
        tempid:0,
        totalQwt:0,
        userEmail:' ',
        Password:" "
      }
    );
   
  
  useEffect(() => {
    setProducts();

    if(localStorage.getItem('data')){
      const statedate = JSON.parse(localStorage.getItem('data'));
      setState((previous) => {
        return { ...previous,...statedate };
      });
    }
    
  },[]);

  

  const setProducts = () => {
    let products = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    setState((previous) => {
      return { ...previous,products };
    });
  };

  const getItem = id => {
    const product = state.products.find(item => item.id === id);
    return product;
  };
  const handleDetail = id => {
    const product = getItem(id);
    setState((previous) => {
      return { ...previous,detailProduct: product };
    });
  };

  const addToCart = id => {
    if(!state.isLoggIn){
      setState((previous) => {
        return { ...previous,login: true ,tempid:id};
      });

      return;
    }
    let tempProducts = [...state.products];
    const index = tempProducts.indexOf(getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;

    setState((previous) => {
      localStorage.setItem('data',JSON.stringify({  ...previous,  products: [...tempProducts],
        cart: [...state.cart, product],
        detailProduct: { ...product },
        cartTotal:previous.cartTotal + product.price,
         totalQwt:previous.totalQwt + 1}))
      
      return {
        ...previous,
        products: [...tempProducts],
        cart: [...state.cart, product],
        detailProduct: { ...product },
        cartTotal:previous.cartTotal + product.price,
         totalQwt:previous.totalQwt + 1
      };
    });
    
    openModal(id)  
  };
  const openModal = id => {
    const product = getItem(id);
    setState((previous) => {
      return { ...previous,modalProduct: product, modalOpen: true };
    });
  };
  const closeModal = () => {
    setState((previous) => {
      return { ...previous,modalOpen: false };
    });
  };


 const  isLoggIncheck = (data) =>{
    setState((previous) => {
      localStorage.setItem('data',JSON.stringify({  ...previous,login:false,isLoggIn: true,Password:data.password, userEmail:data.email}))
      return {  ...previous,login:false,isLoggIn: true,Password:data.password, userEmail:data.email};
    },  

    );
  }
  
  const increment = id => {
    let tempCart = [...state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    setState((previous) => {
      localStorage.setItem('data',JSON.stringify( {
        ...previous,
        cart: [...tempCart],
        cartTotal:previous.cartTotal + product.price,
         totalQwt:previous.totalQwt + 1

      }))

      return {
        ...previous,
        cart: [...tempCart],
        cartTotal:previous.cartTotal + product.price,
         totalQwt:previous.totalQwt + 1

      };
    });
  };
  const decrement = id => {
    let tempCart = [...state.cart];
    const selectedProduct = tempCart.find(item => {
      return item.id === id;
    });
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      removeItem(id);
    } else {
      product.total = product.count * product.price;
      setState((previous) => {
        localStorage.setItem('data',JSON.stringify({...previous, cart: [...tempCart], cartTotal:previous.cartTotal - selectedProduct.price, totalQwt:previous.totalQwt - 1 }))
        return {...previous, cart: [...tempCart], cartTotal:previous.cartTotal - selectedProduct.price, totalQwt:previous.totalQwt - 1 };
      });
    }
  };
  
   
  const removeItem = id => {
    let tempProducts = [...state.products];
    let tempCart = [...state.cart];

    const index = tempProducts.indexOf(getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    const price = removedProduct.total;
    removedProduct.count = 0;
    removedProduct.total = 0;

    tempCart = tempCart.filter(item => {
      return item.id !== id;
    });

    setState((previous) => {
      localStorage.setItem('data',JSON.stringify({
        ...previous,
        cart: [...tempCart],
        products: [...tempProducts],
        cartTotal:previous.cartTotal - price, 
        totalQwt:previous.totalQwt - 1
      }))

      return {
        ...previous,
        cart: [...tempCart],
        products: [...tempProducts],
        cartTotal:previous.cartTotal - price, 
        totalQwt:previous.totalQwt - 1
      };
    });
  };
  const clearCart = () => {
    setState(
      (previous) => {
    localStorage.setItem('data',JSON.stringify({ ...previous,cart: [],products:[...storeProducts], totalQwt:0,cartTotal:0 }))

        return { ...previous,cart: [],products:[...storeProducts], totalQwt:0,cartTotal:0 };
      }
    );
    setProducts();
  };
  
    return (
      <ProductContext.Provider
        value={{
          state : state,
          handleDetail: handleDetail,
          addToCart: addToCart,
          openModal: openModal,
          closeModal: closeModal,
          increment: increment,
          decrement: decrement,
          removeItem: removeItem,
          clearCart: clearCart,
          isLoggIncheck: isLoggIncheck,
          
        }}
      >
        {props.children};

      </ProductContext.Provider>
    );
  
      }

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
