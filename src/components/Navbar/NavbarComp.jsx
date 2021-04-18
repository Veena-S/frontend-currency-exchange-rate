import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  CurrencyExchangeContext, setBaseCurrency,
} from '../../appContextStore.jsx';

/**
 * React component for Navbar
 */
export default function NavbarComp() {
  /**
   * useContext accepts a context object and returns the current context
   * Current context value is determined by the Provider above the calling component
   * When the Provider component gets updated, useContext hook will render with latest
   * context value passed to "CurrencyExchangeContext"
   */
  const { store, dispatch } = useContext(CurrencyExchangeContext);

  const setSelectedBaseCurrency = (currencyCode) => {
    dispatch(setBaseCurrency(currencyCode));
  };

  // Dropdown currency codes
  const baseDropdownItems = store.currencyCodeList.map((currencyCode, index) => (
    <NavDropdown.Item href="#" onClick={() => { setSelectedBaseCurrency(currencyCode); }} key={`currency-${Number(index)}`}>{currencyCode}</NavDropdown.Item>
  ));

  // Dropdown button for base currency selected
  const BaseCurrencyDropDown = () => (
    <NavDropdown title={`Base: ${store.baseCurrency}`} id="collasible-nav-dropdown" className="pr-3">
      {baseDropdownItems}
    </NavDropdown>
  );

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer exact to="/">
          <Navbar.Brand>Assignment</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/viewAllCurrencies">
              <Nav.Link>Currencies</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ml-auto">
            <BaseCurrencyDropDown />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>

  );
}
