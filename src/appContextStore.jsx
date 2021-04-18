/**
 * This file holds the global state for the complete application
 * Also, reducer function is defined in here
 */

// Stores the state across the application
export const appState = {
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