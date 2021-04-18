/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { CurrencyExchangeContext } from '../../appContextStore.jsx';

/**
 * React component for displaying the details of a single currency
 * @param {Object} param0 - prop passed to the component.
 *                          currencyCode: code of the currency for which this component is created
 *                          exchangeRate: exchange rate corresponding to the given currency code
 * These values are a single item under the store state "latestExchangeRateDetails"
 * With the currency code given, details of a single currency can be taken from
 * the store state 'currencyDetails'
 * @returns - component that can be used to display the currency data
 */
export default function CurrencyCard({ currencyCode, exchangeRate }) {
  const { store, dispatch } = useContext(CurrencyExchangeContext);
  const singleCurrencyData = store.currencyDetails[currencyCode];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {currencyCode}
          <span className="ml-auto">{Number(exchangeRate).toFixed(Number(singleCurrencyData.decimal_units))}</span>
        </h5>
        <p className="card-text">{singleCurrencyData.currency_name}</p>
      </div>
    </div>
  );
}
