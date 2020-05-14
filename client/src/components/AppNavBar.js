import React, { Component,  Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  NavbarBrand
} from 'reactstrap';
import App from '../App';
import RegisterModal from './auth/RegisterModal';
import LogoutModal from './auth/Logout';
import LoginModal from './auth/LoginModal';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavBar extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isAuthenticated, user } =  this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong> { user ? `Welcome ${user.firstName}`: ''} </strong>
          </span>
          <LogoutModal/>
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal/>
        </NavItem>
        <NavItem>
          <LoginModal/>
        </NavItem>
      </Fragment>
    );

    return(
      <div>
      <Navbar color="light" light expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Tacos To Go</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              { isAuthenticated ? authLinks: guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);