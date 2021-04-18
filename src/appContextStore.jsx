/* eslint-disable react/prop-types */
/**
 * Defines Context and holds the global state for the complete application
 * Also, reducer function is defined in here
 *
 */

import React, { useReducer } from 'react';
import axios from 'axios';
import { writeStorage, useLocalStorage, deleteFromStorage } from '@rehooks/local-storage';

// Backend URL
const PORT = process.env.PORT || 3004;
export const BACKEND_URL = `http://localhost:${PORT}`;

// Stores the state across the application
export const initialState = {
  baseCurrency: '',
  currencyDetails: {}, // Key = Currency Code, Value = {name, code, units, country array}
  currencyCodeList: [],
  /**
   { date: '2021-04-17', base: 'USD',
      rates: { AED: 3.6725, AFN: 77.49777256, .... }
    }
   */
  latestExchangeRateDetails: {},
  /**
   * ReturnData: { status: 200, statusText: 'Success',
   *               data: {[yyyy-mm-dd]: {status: 200, statusText: 'Success',
   *                                     response: {date: '2021-04-17', base: 'baseCurrency',
   *                                             rates: {  requestingCurrencyCode: 2.75196681}},
   *                       [yyyy-mm-dd]:{status: 200, statusText: 'Success',
   *                                     response:{<data returned from axios call to URL>}},
   *                      ....
   *                    }
   *              }
   */
  historicalExchangeRates: {},

};

// Action Types
const SET_INITIAL_BASE_CURRENCY = '';
// To set the base currency selected
const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
// To set the supported list of currency details
const SET_CURRENCY_DETAILS = 'SET_CURRENCY_DETAILS';
// To set the currency code list
const SET_CURRENCY_CODE_LIST = 'SET_CURRENCY_CODE_LIST';
// To set the latest currency details
const SET_LATEST_RATES = 'SET_LATEST_RATES';
// To set the historical exchange rates
const SET_HISTORICAL_RATES = 'SET_HISTORICAL_RATES';

// Reducer function that manipulates the state
// It allows to set new state values based on the previous state
export function currencyExchangeReducer(state, action) {
  switch (action.type) {
    case SET_INITIAL_BASE_CURRENCY:
    {
      // Check whether the local storage already has baseCurrency.
      // If so, initialize with it
      const [localStoreBaseCurrency] = useLocalStorage('baseCurrency');
      const tempBaseCurrency = (localStoreBaseCurrency) || 'USD';
      if (!localStoreBaseCurrency) {
        writeStorage('baseCurrency', tempBaseCurrency);
      }
      return { ...state, baseCurrency: tempBaseCurrency };
    }
    case SET_BASE_CURRENCY:
    {
      // Whenever the base currency is changed update the local storage
      writeStorage('baseCurrency', action.payload.baseCurrency);
      return { ...state, baseCurrency: action.payload.baseCurrency };
    }
    case SET_CURRENCY_DETAILS:
      // Get the codes of all the currency and set it to the state currencyCodeList also
      return {
        ...state,
        currencyDetails: { ...action.payload.currencyDetails },
      };
    case SET_CURRENCY_CODE_LIST:
      return {
        ...state,
        currencyCodeList: [...Object.keys(action.payload.currencyDetails)],
      };
    case SET_LATEST_RATES:
      return {
        ...state,
        latestExchangeRateDetails: { ...action.payload.latestExchangeRateDetails },
      };
    case SET_HISTORICAL_RATES:
      return {
        ...state,
        historicalExchangeRates: { ...action.payload.historicalExchangeRates },
      };
    default:
      return state;
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
export function setBaseCurrency(baseCurrency) {
  return {
    type: SET_BASE_CURRENCY,
    payload: {
      baseCurrency,
    },
  };
}

export function setInitialBaseCurrency() {
  return {
    type: SET_INITIAL_BASE_CURRENCY,
    payload: {},
  };
}

/**
 * This function creates the action object for modifying the stored currency list state
 * @param {Object} currencyDetails - Object data with details of the supported currency list
 *                              - Key = Currency Code, Value = {name, code, units, country array}
 * @returns - Action object
 */
export function setCurrencyDetails(currencyDetails) {
  return {
    type: SET_CURRENCY_DETAILS,
    payload: {
      currencyDetails,
    },
  };
}

export function setCurrencyCodeList(currencyDetails) {
  return {
    type: SET_CURRENCY_CODE_LIST,
    payload: {
      currencyDetails,
    },
  };
}

/**
 * Function to create action object used to modify the state for latestExchangeRateDetails
 * @param {Object} latestExchangeRateDetails - Latest currency exchange rates returned from server
 * @returns - Action object
 */
export function setLatestRates(latestExchangeRateDetails) {
  return {
    type: SET_LATEST_RATES,
    payload: { latestExchangeRateDetails },
  };
}

/**
 * Function to create action object used to modify the state for historical data
 * @param {Object} historicalExchangeRates - Details for a period of dates returned from server
 * @returns - Action Object
 */
export function setHistoricalRates(historicalExchangeRates) {
  return {
    type: SET_HISTORICAL_RATES,
    payload: { historicalExchangeRates },
  };
}

/** ****************************************
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
export function CurrencyExchangeProvider({ children }) {
  // Before using reducer, set the base currency:

  const [localStoreBaseCurrency] = useLocalStorage('baseCurrency');
  const tempBaseCurrency = (localStoreBaseCurrency) || 'USD';
  if (!localStoreBaseCurrency) {
    writeStorage('baseCurrency', tempBaseCurrency);
  }
  initialState.baseCurrency = tempBaseCurrency;

  // The useReducer function accepts a reducer of type (state, action) ,
  // and returns the current state paired with a dispatch method.
  const [store, dispatch] = useReducer(currencyExchangeReducer, initialState);
  // Returns the Provider component
  // It accepts a value prop to be passed to consuming components
  // that are descendants of this Provider
  return (
    <Provider value={{ store, dispatch }}>
      {children}
    </Provider>
  );
}

/*
 *  Requests to the Backend or any other ajax requests *
 *
 */
/**
 * This function gets the supported currency list from the server
 * @param {function} dispatch - dispatch method to call create Action object function
 */
export function getCurrencyList(dispatch) {
  return axios.get(`${BACKEND_URL}/api/currencies`)
    .then((result) => {
      dispatch(setCurrencyDetails(result.data));
      dispatch(setCurrencyCodeList(result.data));
    });
}

/**
 * Function to get the latest currency exchange rate based on the specified base currency
 * @param {function} dispatch - Dispatch function for Action object creation
 * @param {string} baseCurrency - Base currency to specify in the request to the server
 */
export function getLatestExchangeRates(dispatch, baseCurrency) {
  return axios.get(`${BACKEND_URL}/api/latest-rate/${baseCurrency}`)
    .then((result) => {
      dispatch(setLatestRates(result.data));
    });
}

/**
 * Function to get the historical exchange rate for over a period of time
 * @param {Function} dispatch - Dispatch function
 * @param {String} baseCurrency - Base currency on which rates are calculated
 * @param {Number} numOfDays - Time period for historical data
 * @param {String} requestingCurrencyCode - Currency code for which historical data is requesting
 * @returns
 */
export function getHistoricalRatesForPeriod(dispatch, baseCurrency, numOfDays,
  requestingCurrencyCode, setHistoryLoaded) {
  return axios.get(`${BACKEND_URL}/api/historical-rate/${baseCurrency}/${numOfDays}?currencies=${requestingCurrencyCode}`)
    .then((result) => {
      /**
       * ReturnData: { status: 200, statusText: 'Success',
       *               data: {[yyyy-mm-dd]: {status: 200, statusText: 'Success',
       *                                     response: {date: '2021-04-17', base: 'baseCurrency',
       *                                             rates: {  requestingCurrencyCode: 2.75196681}},
       *                       [yyyy-mm-dd]:{status: 200, statusText: 'Success',
       *                                     response:{<data returned from axios call to URL>}},
       *                      ....
       *                    }
       *              }
       */
      dispatch(setHistoricalRates(result.data));
      setHistoryLoaded(true);
    });
}
