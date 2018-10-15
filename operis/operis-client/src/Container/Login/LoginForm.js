import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';

const LoginForm = ({ handleSubmit, handleChange }) => (
  <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" color="teal" textAlign="center">
        <Image src="https://placekitten.com/200/200?image=3" /> Log-in to your
        account
      </Header>
      <Form size="large" onSubmit={handleSubmit}>
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            id="email"
            iconPosition="left"
            placeholder="E-mail address"
            onChange={handleChange}
          />
          <Form.Input
            fluid
            icon="lock"
            id="password"
            iconPosition="left"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />

          <Button color="teal" fluid size="large">
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href="#">Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
);

export default LoginForm;
