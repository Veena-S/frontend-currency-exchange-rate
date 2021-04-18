import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CurrencyExchangeProvider } from './appContextStore.jsx';
import NavbarComp from './components/Navbar/NavbarComp.jsx';
import HomePage from './components/HomePage/HomePage.jsx';

export default function App() {
  return (
    <CurrencyExchangeProvider>
      <Router>
        <NavbarComp />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/viewAllCurrencies" component={HomePage} />
        </Switch>
      </Router>
    </CurrencyExchangeProvider>
  );
}
