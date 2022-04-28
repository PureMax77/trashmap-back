import { gql } from "apollo-server"

export default gql`
  type Query {
    seeArticles(offset: Int!): [Article]
  }
`
