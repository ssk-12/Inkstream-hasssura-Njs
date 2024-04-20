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


export const INSERT_POST_MUTATION = gql`
mutation insertPost($title: String!, $content: String!, $authorId: String) {
  insert_Post_one(object: {title: $title, content: $content, authorId: $authorId}) {
    id
    title
    content
  }
}

`;

export const GET_BLOGS_QUERY = gql`
query GetPost {
  Post {
    published
		content
		title
		authorId
		id
  }
}
`;