import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Consumer } from './Context';
import Header from './Header';
import Container from './Container';
import Flex from './Flex';
import Button from './Button';
import Form from './Form';
import Error from './Error';
import { handleError } from '../helpers';

// Provides the "Create Course" screen by rendering a form
class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    error: {},
  };

  /*
  * Creates a new course
  * @param {Object} user - The current user
  */
  createCourse = (user) => {
    const {
      title, description, estimatedTime, materialsNeeded,
    } = this.state;
    const { _id, emailAddress, password } = user;
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/courses',
      auth: {
        username: emailAddress,
        password,
      },
      data: {
        user: _id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
      },
    })
      .then(() => {
        const { history } = this.props;
        history.push('/');
      })
      .catch((error) => {
        this.setState({
          error: error.response,
        });
        handleError(error, this.props);
      });
  }

  // Update the state based on user input
  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  /*
  * Handles the form submission
  * @param {Object} event - The event object
  * @param {Object} user - The current user
  */
  handleSubmit = (event, user) => {
    event.preventDefault();
    this.createCourse(user);
  }

  /*
  * Shows a message if there is a validation error
  * @returns {String} - The error message
  */
  showError = () => {
    const { title, description } = this.state;
    if (title === '') { return 'Please provide a value for "Title"'; }
    if (description === '') { return 'Please provide a value for "Description"'; }
    return null;
  }

  render() {
    const {
      title, description, estimatedTime, materialsNeeded, error,
    } = this.state;
    return (
      <>
        <Header {...this.props} />
        <Container>
          <CreateCourseForm>
            <h1>Create Course</h1>
            <Error>{error.status === 400 && this.showError() }</Error>
            <Consumer>
              {({ user }) => (
                <form onSubmit={(event) => {
                  this.handleSubmit(event, user);
                }}
                >
                  <FormGrid>
                    <div>
                      <h4>Course</h4>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Course title..."
                        aria-label="Title"
                        value={title}
                        onChange={this.handleChange}
                      />
                      <p>{user && `By ${user.firstName} ${user.lastName}`}</p>
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Course description..."
                        aria-label="Description"
                        value={description}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div>
                      <h4>Estimated Time</h4>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        placeholder="Hours"
                        aria-label="Estimated Time"
                        value={estimatedTime}
                        onChange={this.handleChange}
                      />
                      <h4>Materials Needed</h4>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        placeholder="List materials..."
                        aria-label="Materials Needed"
                        value={materialsNeeded}
                        onChange={this.handleChange}
                      />
                    </div>
                    <Flex row>
                      <FormButton buttonType="submit">Create Course</FormButton>
                      <FormButton buttonType="link" link="/" outline>Cancel</FormButton>
                    </Flex>
                  </FormGrid>
                </form>
              )}
            </Consumer>
          </CreateCourseForm>
        </Container>
      </>
    );
  }
}

const CreateCourseForm = styled(Form)`
  h4 {
    color: #bababa;
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.125rem;
    text-transform: uppercase;
  }

  textarea {
    min-height: 200px;
  }

  p {
    margin-top: 0;
    font-size: 1.125rem;
  }
`;

const FormGrid = styled.div`
  display: grid;

  @media (min-width:768px) {
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 30px;
  }

  @media (min-width: 992px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const FormButton = styled(Button)`
  margin-right: 15px;
`;

export default withRouter(CreateCourse);
