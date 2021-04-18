import React, { useContext, useEffect } from 'react';
import { CurrencyExchangeContext, getCurrencyList, getLatestExchangeRates } from '../../appContextStore.jsx';
import CurrencyCardsContainer from '../Currency/CurrencyCardsContainerComp.jsx';

export default function HomePage() {
  const { store, dispatch } = useContext(CurrencyExchangeContext);

  /**
   * After the initial rendering, complete currency list
   */
  useEffect(() => {
    getCurrencyList(dispatch);
    getLatestExchangeRates(dispatch, store.baseCurrency);
  }, []);

  /**
   * Get the latest rates, if the selected base currency changes
   */
  useEffect(() => {
    getLatestExchangeRates(dispatch, store.baseCurrency);
  }, [store.baseCurrency]);

  return (
    <div>
      { (store.latestExchangeRateDetails !== undefined
        && store.latestExchangeRateDetails !== null
        && store.latestExchangeRateDetails.rates !== undefined)
        && <CurrencyCardsContainer />}

    </div>
  );
}
