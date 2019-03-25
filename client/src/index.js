import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Navbar from './components/Navbar';
import Signup from './components/Auth/Signup';
import Signin from './components/Auth/Signin';
import Search from './components/Product/Search';
import News from './components/Product/News';
import Contact from './components/Profile/Contact';
import Profile from './components/Profile/Profile';
import withSession from './components/withSession';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log('Network Error', networkError);
    }
  }

});
const Root = ({ refetch, session }) => (

  <Router>
    <Fragment>
      <Navbar session={session} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/Search" component={Search} />
        <Route path="/Signin" render={() => <Signin refetch={refetch} />} />
        <Route path="/Signup" render={() => <Signup refetch={refetch} />} />
        <Route path="/News" component={News} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Contact" component={Contact} />

        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root"));