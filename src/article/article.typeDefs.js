import { gql } from "apollo-server"

export default gql`
  type Article {
    id: Int!
    url: String!
    tMountain: T_Mountain
    ogPreview: OgPreview
    createdAt: String!
    updatedAt: String!
  }
`
