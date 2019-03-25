import { gql } from 'apollo-boost';

/* Products Queries */

export const GET_ALL_PRODUCTS = gql`  
query {
    getAllProducts{
     name
     description
     instruction
     category
     likes
     createDate
    }
    }
`;

export default GET_ALL_PRODUCTS;

/* Products Mutations */

/* User queries */

export const GET_CURRENT_USER = gql`  
query {
  getCurrentUser{
     firstName
     lastName
     jointDate
     email
     permission
    }
    }
`

/* User mutations */

export const SIGNIN_USER = gql`

mutation ($email:String!, $password:String!){
  signin(email:$email, password:$password){
    token
  }
}
`;

export const SIGNUP_USER = gql`

mutation ($firstName:String!,$lastName:String!, $email: String! , $password:String!){
  signup(firstName:$firstName,lastName:$lastName, email:$email, password:$password){
    token
  }
}
`;