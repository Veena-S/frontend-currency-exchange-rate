/**
 * Defines Context and holds the global state for the complete application
 * Also, reducer function is defined in here
 * 
 */

import { useReducer } from "react";

// Backend URL
const PORT = process.env.PORT || 3004;
export const BACKEND_URL = `http://localhost:${PORT}`;

// Stores the state across the application
export const initialState = {
  baseCurrency: 'USD',
  currencyList: {},
  
}

// Action Types
// To set the base currency selected
const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";
// To set the supported list of currencies
const SET_CURRENCY_LIST = 'SET_CURRENCY_LIST';

// Reducer function that manipulates the state
// It allows to set new state values based on the previous state
export function currencyExchangeReducer(state, action){

  switch(action.type){
    case SET_BASE_CURRENCY:
      return {...state, baseCurrency: action.payload.baseCurrency}
    case SET_CURRENCY_LIST:
      return {...state, currencyList: {...action.payload.currencyList}}
  }
}

// Action generating functions
// These functions accept inputs relevant to the action and
// return an object that represents the action, which is passed to the dispatch function
// Actions always contain a type attribute used to identify the action and 
// tell the reducer what logic to run.

/**
 * This function creates the action object for modifying the base currency state
 * @param {string} baseCurrency - value of the baseCurrency State
 * @returns - action object
 */
export function setBaseCurrency( baseCurrency ){
  return {
    type: SET_BASE_CURRENCY,
    payload: {
      baseCurrency,
    },
  }
}

/**
 * This function creates the action object for modifying the stored currency list state
 * @param {Object} currencyList - Object data with details of the supported currency list
 *                              - Key = Currency Code, Value = {name, code, units, country array}
 * @returns - Action object
 */
export function setCurrencyList( currencyList ){
  return {
    type: SET_CURRENCY_LIST,
    payload: {
      currencyList,
    },
  }
}

/******************************************
 * ****************************************
 *    Context and Provider
 *
 * Context provides a way to pass data through the component tree without 
 * having to pass props down manually at every level
 * ****************************************
 */

// Create a context for the current app
// When React renders a component that subscribes to this Context object 
// it will read the current context value from the matching Provider.
export const CurrencyExchangeContext = React.createContext(null);
// Every Context object comes with a Provider React component that allows
// consuming components to subscribe to context changes.
const { Provider } = CurrencyExchangeContext;



/**
 * Provider component that contains the initialized reducer
 * The benefit of combining useReducer with context is being able to call 
 * the dispatch function anywhere down the component tree without passing through props.
 * @param {React.Component} param0 - prop of children
 * @returns - initialized Provider 
 */
export function CurrencyExchangeProvider({children}) {
  // The useReducer function accepts a reducer of type (state, action) ,
  // and returns the current state paired with a dispatch method.
  const [store, dispatch] = useReducer(currencyExchangeReducer, initialState);
  // Returns the Provider component
  // It accepts a value prop to be passed to consuming components
  // that are descendants of this Provider
  return (
    <Provider value={{store, dispatch}}>
      {children}
    </Provider>
  )
}


/*
 *  Requests to the Backend or any other ajax requests * 
 * 
 */

export function getCurrencyList() {
  
}