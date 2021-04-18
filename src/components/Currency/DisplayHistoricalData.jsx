/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import { CurrencyExchangeContext } from '../../appContextStore.jsx';

export default function DisplayHistoricalData({ currencyCode, days }) {
  const { store, dispatch } = useContext(CurrencyExchangeContext);
  // const { currencyCode, days } = useParams();

  if (store.historicalExchangeRates === undefined
    || store.historicalExchangeRates === null
    || store.historicalExchangeRates.data === undefined) {
    return (<div />);
  }

  const singleCurrencyData = store.currencyDetails[currencyCode];
  const exchangeRate = store.latestExchangeRateDetails.rates[currencyCode];

  // Grid form to display the currency rates
  const DisplayHistoricalRates = () => (
    <div>
      {Object.keys(store.historicalExchangeRates.data).map((date, index) => (
        <div className="row border" key={`${date}-${currencyCode}`}>
          <div className="col border-right">{moment(date).format('DD MMMM YYYY')}</div>
          <div className="col">
            {Number(store.historicalExchangeRates.data[date
            ].response.rates[singleCurrencyData.currency_code]).toFixed(Number(
              singleCurrencyData.decimal_units,
            ))}
            {' '}
            {getSymbolFromCurrency(singleCurrencyData.currency_code)}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mt-4 text-center">
      <div className="row border">
        <div className="col border-right">Date</div>
        <div className="col">Exchange Rate</div>
      </div>
      <DisplayHistoricalRates />
    </div>
  );
}
