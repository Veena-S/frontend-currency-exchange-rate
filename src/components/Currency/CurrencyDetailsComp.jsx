/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import DisplayHistoricalData from './DisplayHistoricalData.jsx';
import { CurrencyExchangeContext, getHistoricalRatesForPeriod } from '../../appContextStore.jsx';
import DisplayTodaysExchangeRate from './DisplayTodaysExchangeRate.jsx';
import LoadSpinner from '../LoadSpinner.jsx';

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
  const [timePeriod, setTimePeriod] = useState(-1);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  /**
   *
   * @param {Number} numOfDays - time period
   */
  const onChangePeriodSelection = (numOfDays) => {
    setHistoryLoaded(false);
    setTimePeriod(numOfDays);
    if (numOfDays === 0) {
      // No need to request to the server.
      // Already existing data can be displayed
      return;
    }
    getHistoricalRatesForPeriod(dispatch, store.baseCurrency,
      numOfDays, currencyCode, setHistoryLoaded);
  };

  /**
   * Creates the component group for buttons
   * @returns - Returns the button group
   */
  const CreateTimePeriodButtons = () => (
    <div className="btn-group mb-3" role="group" aria-label="Basic example">
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => { onChangePeriodSelection(0); }}
      >
        Today
      </button>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => { onChangePeriodSelection(3); }}
      >
        Last 3 days
      </button>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={() => { onChangePeriodSelection(7); }}
      >
        Last 7 days
      </button>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="row mt-4">
        <h4>{currencyCode}</h4>
      </div>
      <div className="row mt-2">
        <p className="text-muted"><small>{singleCurrencyData.currency_name}</small></p>
      </div>
      <div className="row mt-4">
        <CreateTimePeriodButtons />
      </div>
      {(timePeriod === 0)
      && <DisplayTodaysExchangeRate currencyCode={currencyCode} />}
      {(timePeriod === 3 || timePeriod === 7)
      && ((historyLoaded && <DisplayHistoricalData currencyCode={currencyCode} days={timePeriod} />)
      || (!historyLoaded && <LoadSpinner />))}
    </div>
  );
}
