/* eslint-disable react/prop-types */
import './CurrencyCard.css';
import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';

/**
 * React component for displaying the details of a single currency
 * @param {Object} param0 - prop passed to the component.
 *                          singleCurrencyData: currency details for which this component is created
 *                          exchangeRate: exchange rate corresponding to the given currency code
 * These values are a single item under the store state "latestExchangeRateDetails"
 * With the currency code given, details of a single currency can be taken from
 * the store state 'currencyDetails'. This is the prop given as singleCurrencyData
 * @returns - component that can be used to display the currency data
 */
export default function CurrencyCard({ singleCurrencyData, exchangeRate }) {
  return (
    <div className="col mb-4">
      <div className="card currency-card">
        <div className="card-body currency-card-body">
          <h6 className="card-title d-flex justify-content-between">
            {singleCurrencyData.currency_code}
            <span>
              {Number(exchangeRate).toFixed(Number(singleCurrencyData.decimal_units))}
              {' '}
              {getSymbolFromCurrency(singleCurrencyData.currency_code)}
            </span>
          </h6>
          <p className="text-muted"><small>{singleCurrencyData.currency_name}</small></p>
        </div>
      </div>
    </div>
  );
}
