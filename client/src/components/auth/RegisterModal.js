import React, { Component } from 'react';
import {
  Button, 
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input, 
  NavLink, 
  Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    firstName: '',
    lastName: '',
    email: '', 
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired, 
    register: PropTypes.func.isRequired, 
    clearErrors: PropTypes.func.isRequired
  }

  toggle = () => {
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };

  onSubmit = event => {
    event.preventDefault();

    const { firstName, lastName, email, password } = this.state;

    // Create user object
    const newUser = {
      firstName,
      lastName,
      email,
      password
    };

    // Attempt to register the user 
    this.props.register(newUser);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if(error !== prevProps.error) {
      // Check for register error
      if(error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      }
      else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if(this.state.modal && this.props.isAuthenticated) {
      this.toggle();
    }
  }

  render() {
    return(
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="register-modal-hdr">
            Register
          </ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="register-modal">
                <Label for="firstName"> First Name </Label> 
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  className="mb-3"
                  onChange={this.onChange}/>

                <Label for="lastName"> Last Name </Label> 
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  className="mb-3"
                  onChange={this.onChange}/>

                <Label for="email"> Email </Label> 
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter email address"
                  className="mb-3"
                  onChange={this.onChange}/>

                <Label for="password"> Password </Label> 
                <Input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Enter a password"
                  className="mb-3"
                  onChange={this.onChange}/>

                  <Button color="dark" style={{ marginTop: '2rem'}} block className="register-btn">
                    Register
                  </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);