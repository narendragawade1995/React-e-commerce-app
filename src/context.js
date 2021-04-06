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
        totalQwt:0
      }
    );
   
  
  useEffect(() => {
    setProducts();
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


 const  isLoggIncheck = () =>{
    setState((previous) => {
      return {  ...previous,login:false,isLoggIn: true};
    }, ()=>{
      addToCart(state.tempid);
      openModal(state.tempid);
    });
  
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
        return {...previous, cart: [...tempCart], cartTotal:previous.cartTotal - selectedProduct.price, totalQwt:previous.totalQwt - 1 };
      }, () =>addTotals());
    }
  };
  const getTotals = () => {
    // const subTotal = state.cart
    //   .map(item => item.total)
    //   .reduce((acc, curr) => {
    //     acc = acc + curr;
    //     return acc;
    //   }, 0);
    let subTotal = 0;
    let totalQwt = 0;
    state.cart.map(item =>{
      subTotal += item.total;
      totalQwt += item.count
    });
   const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal ;
    return {
      subTotal,
      tax,
      total,
      totalQwt
    };
  };
  const addTotals = () => {
    const totals = getTotals();
    setState(
      (previous) => {
        return {
          ...previous,
         // cartSubTotal: totals.subTotal,
         // cartTax: totals.tax,
          cartTotal: totals.total,
          totalQwt:totals.totalQwt
        };
      },
      () => {
        // console.log(state);
      }
    );
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
        return { ...previous,cart: [] };
      },
      () => {
        setProducts();
        addTotals();
      }
    );
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
