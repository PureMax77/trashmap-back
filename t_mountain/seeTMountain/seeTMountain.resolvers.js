import client from "../../client"

export default {
  Query: {
    seeTMountain: (_, { id }) => {
      return client.t_Mountain.findUnique({ where: { id } })
    },
  },
}
