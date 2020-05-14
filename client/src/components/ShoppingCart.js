import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';
import { getMenuItems, deleteMenuItem } from '../actions/menuItemActions';
import PropTypes from 'prop-types';

class ShoppingCart extends Component {
  componentDidMount() {
    this.props.getMenuItems();
  }

  deleteOnClick = (id) => {
    console.log(id)
    this.props.deleteMenuItem(id);
  }

  render() {
    return(
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-cart">
            {this.props.menuItems.menuItems.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  { this.props.isAuthenitcated ? <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.deleteOnClick.bind(this, _id)}>
                    &times;
                  </Button> : null}
                  
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

ShoppingCart.propTypes = {
  getMenuItems: PropTypes.func.isRequired,
  menuItems: PropTypes.object.isRequired,
  isAuthenitcated: PropTypes.bool
}

const mapStateToProps = (state) => ({
  menuItems: state.menuItems,
  isAuthenitcated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getMenuItems, deleteMenuItem })(ShoppingCart);