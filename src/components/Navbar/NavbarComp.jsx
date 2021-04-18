import React/* , { useContext } */ from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import { CurrencyExchangeContext } from '../../appContextStore.jsx';

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
  // const { store, dispatch } = useContext(CurrencyExchangeContext);

  return (
    <>
      <Navbar bg="dark" expand="lg">
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
            <Nav.Link>Base</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>

  );
}
