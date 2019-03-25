import React from "react";
import './App.css';

import { Query } from "react-apollo";

import { GET_ALL_PRODUCTS } from '../queries';

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_PRODUCTS}>
      {({ data, loading, error }) => {
        if (loading) return <div>loading</div>;
        if (error) return <div>error</div>;
        console.log(data);

        return <p>Products</p>;

      }}
    </Query>
  </div>
);

export default App; 