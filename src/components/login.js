import React,{useState,useContext} from "react";
import styled from "styled-components";
import { ProductContext } from "../context";

const Login = () => {
    const value = useContext(ProductContext);
    const [state, setState] = useState( {
        fields: {},
        errors: {}
    });
    onsubmit= () =>{
        if(handleValidation()){
            value.isLoggIncheck(state.fields);
         }
    }

    const handleChange = (e) =>{         
        let fields = state.fields;
        fields[e.target.name] = e.target.value;        
        setState((prex) => ({...prex,fields}));
    }
    const handleValidation = () =>{
        let fields = state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["password"]){
           formIsValid = false;
           errors["password"] = "password is required";
        }
  
        
   
        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Email is required";
        }
  
        if(typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }  

       setState((prevs) =>({...prevs,errors: errors}));
       return formIsValid;
   }
return (
    (!value.state.login)? null:
   
           <ModalContainer>
               <div className="container">
                   <div className="row">
                       <div
                           className="col-8 mx-auto col-md-8 col-lg-6 p-5 text-center text-capitalize"
                           id="modal"
                       >

                           <h5>Login</h5>

                           <form  >
                               <div className="form-group d-flex align-items-center position-relative  mb-4">
                                   <div className="col-md-3">Email:</div>
                                   <input type="email" className="form-control" placeholder="Enter email" id="email" name="email"     refs="email" onChange={handleChange} value={state.username} autoComplete="on"/>
                                    <span  className="text-danger  validation">{state.errors["email"]}</span>

                               </div>
                               <div className="form-group  d-flex align-items-center position-relative mb-4">
                                   <div className="col-md-3 ">Password:</div>
                                   <input type="password" className="form-control" placeholder="Enter password" id="pwd" name="password"   refs="password"  onChange={handleChange}    value={state.password} autoComplete="off"/>
                               <span  className="text-danger  validation">{state.errors["password"]}</span>

                               </div>
                                
                               <button type="submit" className="btn btn-primary d-block w-25 m-auto" onClick={(ev) =>{
                                   ev.preventDefault();
                                   // isLoggIncheck();
                                   onsubmit()
                               }}>login</button>
                           </form>

                       </div>
                   </div>
               </div>
           </ModalContainer>
                           
)
}


const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
  .validation{
    position: absolute;
    top: 38px;
    left: 30%;

  }
`;


export default Login;
