import { gql } from "apollo-server"

export default gql`
  type Video {
    id: Int!
    url: String!
    tMountain: [T_Mountain]
    createdAt: String!
    updatedAt: String!
  }
`
