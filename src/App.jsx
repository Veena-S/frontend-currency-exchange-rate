import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CurrencyExchangeProvider } from './appContextStore.jsx';
import NavbarComp from './components/Navbar/NavbarComp.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import CurrencyDetails from './components/Currency/CurrencyDetailsComp.jsx';
import DisplayTodaysExchangeRate from './components/Currency/DisplayTodaysExchangeRate.jsx';
import DisplayHistoricalData from './components/Currency/DisplayHistoricalData.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <CurrencyExchangeProvider>
      <Router>
        <NavbarComp />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/currencylist" component={HomePage} />
          <Route path="/currencydetail/:currencyCode" component={CurrencyDetails} />
          <Route path="/todaysrate/:currencyCode" component={DisplayTodaysExchangeRate} />
          <Route path="/historicalrate/:currencyCode/:days" component={DisplayHistoricalData} />
        </Switch>
      </Router>
    </CurrencyExchangeProvider>
  );
}
