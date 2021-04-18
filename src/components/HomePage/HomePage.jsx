import React, { useContext, useEffect } from 'react';
import { CurrencyExchangeContext, getCurrencyList, getLatestExchangeRates } from '../../appContextStore.jsx';

export default function HomePage() {
  const { store, dispatch } = useContext(CurrencyExchangeContext);

  /**
   * After the initial rendering, complete currency list
   */
  useEffect(() => {
    getCurrencyList(dispatch);
  }, []);

  /**
   * Get the latest rates, if the selected base currency changes
   */
  useEffect(() => {
    getLatestExchangeRates(dispatch, store.baseCurrency);
  }, [store.baseCurrency]);

  return (
    <div />
  );
}
