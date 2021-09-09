import { gql } from "apollo-server"

export default gql`
  type LoginResponse {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    kakaoLogin(token: String!): LoginResponse!
  }
`
