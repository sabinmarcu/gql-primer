import { gql } from 'apollo-server';

export default gql`

  type User {
    id: Int!
    name: String!
    email: String!
    posts: [Post!]
  }

  type Post {
    id: Int!
    owner: User!
    title: String!
    content: String!
    tags: [Tag!]
  }

  type Tag {
    id: Int!
    name: String!
    related: [Tag!]
    posts: [Post!]
  }

  type Query {
    users: [User!]
    posts: [Post!]
    tags: [Tag!]
  }

  input NewUserInput {
    name: String!
    email: String!
  }

  input NewPostDataTagsInput {
    ids: [Int!]
    id: Int
  }
  input NewPostDataInput {
    title: String!
    content: String!
    tags: NewPostDataTagsInput
  }

  type Mutation {
    addUser(data: NewUserInput!): User
    addPost(where: Int!, data: NewPostDataInput!): Post
  }

`;
