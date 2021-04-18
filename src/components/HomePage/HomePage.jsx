import React, { useContext, useEffect } from 'react';
import { CurrencyExchangeContext, getCurrencyList } from '../../appContextStore.jsx';

export default function HomePage() {
  const { store, dispatch } = useContext(CurrencyExchangeContext);

  useEffect(() => {
    getCurrencyList(dispatch);
  }, []);

  return (
    <div />
  );
}
