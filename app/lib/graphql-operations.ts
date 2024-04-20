// lib/graphql-operations.ts
import { gql } from '@apollo/client';

export const FIND_USER_BY_EMAIL_QUERY = gql`
  query FindUserByEmail($email: String!) {
    User(distinct_on: email, where: {email: {_eq: $email}}) {
      id
      name
      email
      password
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation insert_user($email: String!, $password: String!) {
    insert_User_one(object: {
      email: $email,
      password: $password
    }) {
      id
      email
    }
  }
`;
