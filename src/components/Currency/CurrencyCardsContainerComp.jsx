/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { CurrencyExchangeContext } from '../../appContextStore.jsx';
import CurrencyCard from './CurrencyCardComp.jsx';

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
export default function CurrencyCardsContainer() {
  const { store, dispatch } = useContext(CurrencyExchangeContext);

  if (undefined === store.latestExchangeRateDetails.rates
    || store.latestExchangeRateDetails.rates === null
    || store.currencyDetails === undefined || store.currencyDetails === null) {
    return (<div />);
  }

  return (
    <div className="container-sm mt-4">
      <div className="row row-cols-md-3">
        {Object.entries(store.latestExchangeRateDetails.rates).map(([currencyCode, exchangeRate],
          index) => (
          (undefined !== store.currencyDetails[currencyCode]
            && store.currencyDetails[currencyCode] !== null
            && <CurrencyCard key={`latest-${Number(index)}`} singleCurrencyData={store.currencyDetails[currencyCode]} exchangeRate={exchangeRate} />)
        ))}
      </div>
    </div>

  );
}
