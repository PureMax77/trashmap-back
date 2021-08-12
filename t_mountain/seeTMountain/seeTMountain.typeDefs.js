import { gql } from "apollo-server"

export default gql`
  type Query {
    seeTMountain(id: Int!): T_Mountain
  }
`
