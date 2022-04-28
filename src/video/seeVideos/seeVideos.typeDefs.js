import { gql } from "apollo-server"

export default gql`
  type Query {
    seeVideos(offset: Int!): [Video]
  }
`
