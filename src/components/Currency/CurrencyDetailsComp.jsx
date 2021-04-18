/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useParams } from 'react-router';
import { CurrencyExchangeContext } from '../../appContextStore.jsx';

/**
 * React component for displaying the details of a single currency
 * Also shows the historical data
 * @param {Object} param0 - prop passed to the component.
 * @returns - component that can be used to display the currency data
 */
export default function CurrencyDetails() {
  const { store, dispatch } = useContext(CurrencyExchangeContext);
  const { currencyCode } = useParams();

  if (undefined === store.latestExchangeRateDetails.rates
    || store.latestExchangeRateDetails.rates === null
    || store.currencyDetails === undefined || store.currencyDetails === null) {
    return (
      <div className="mt-4">
        <p className="m-3">
          Details of the currency
          {' '}
          {' '}
          {currencyCode}
          {' '}
          is not available.
        </p>
      </div>
    );
  }

  const singleCurrencyData = store.currencyDetails[currencyCode];
  const exchangeRate = store.latestExchangeRateDetails.rates[currencyCode];

  return (
    <div className="container mt-4">
      <h4>{currencyCode}</h4>
      <p className="text-muted"><small>{singleCurrencyData.currency_name}</small></p>

    </div>
  );
}
