import { gql } from "apollo-server";

export default gql`
  type T_Mountain {
    id: Int!
    latitude: Float!
    longtitude: Float!
    address: String!
    amount: Int
    image: String
    finish: Boolean!
    cleanCost: Int
    dumpType: String!
    article: [Article]
    video: [Video]
    createdAt: String!
    updatedAt: String!
  }
`;
