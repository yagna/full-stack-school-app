import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './Header';
import Container from './Container';
import Flex from './Flex';
import Form from './Form';
import Button from './Button';

// Provides the "Sign Up" screen by rendering a form
class UserSignUp extends Component {
  state = {};

  render() {
    return (
      <>
        <Header />
        <Container>
          <SignUpForm>
            <h1>Sign Up</h1>
            <form>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                aria-label="First Name"
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                aria-label="Last Name"
              />
              <input
                id="emailAddress"
                name="emailAddress"
                type="text"
                placeholder="Email Address"
                aria-label="Email Address"
              />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                aria-label="Password"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                aria-label="confirmPassword"
              />
              <Flex row>
                <FormButton buttonType="submit">Sign Up</FormButton>
                <FormButton buttonType="link" link="/" outline>Cancel</FormButton>
              </Flex>
            </form>
          </SignUpForm>
        </Container>
      </>
    );
  }
}

const SignUpForm = styled(Form)`
  max-width: 400px;
`;

const FormButton = styled(Button)`
  margin-right: 15px;
`;

export default UserSignUp;
