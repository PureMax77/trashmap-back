import client from "../../client"

export default {
  Query: {
    seeArticles: (_, { offset }) => client.article.findMany({ take: 4, skip: offset }),
  },
}
