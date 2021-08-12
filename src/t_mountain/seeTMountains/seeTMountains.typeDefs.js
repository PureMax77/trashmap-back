import { gql } from "apollo-server"

export default gql`
  type Query {
    seeTMountains: [T_Mountain]
  }
`
