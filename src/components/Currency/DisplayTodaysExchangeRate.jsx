/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useParams } from 'react-router';
import { CurrencyExchangeContext } from '../../appContextStore.jsx';

export default function DisplayTodaysExchangeRate({ currencyCode }) {
  const { store, dispatch } = useContext(CurrencyExchangeContext);
  // const { currencyCode } = useParams();

  if (undefined === store.latestExchangeRateDetails.rates
    || store.latestExchangeRateDetails.rates === null
    || store.currencyDetails === undefined || store.currencyDetails === null) {
    return (<div />);
  }

  const singleCurrencyData = store.currencyDetails[currencyCode];
  const exchangeRate = store.latestExchangeRateDetails.rates[currencyCode];

  return (
    <div className="container mt-4  text-center">
      <div className="row border">
        <div className="col border-right">Date</div>
        <div className="col">Exchange Rate</div>
      </div>
      <div className="row border">
        <div className="col border-right">{moment(store.latestExchangeRateDetails.date).format('DD MMMM YYYY')}</div>
        <div className="col">
          {Number(exchangeRate).toFixed(Number(singleCurrencyData.decimal_units))}
          {' '}
          {getSymbolFromCurrency(singleCurrencyData.currency_code)}
        </div>
      </div>

    </div>
  );
}
