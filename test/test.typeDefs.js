import { gql } from "apollo-server"

export default gql`
  type Mutation {
    test(url: String!): MutationResponse!
  }
`
