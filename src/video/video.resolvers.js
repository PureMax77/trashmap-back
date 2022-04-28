import client from "../client"

export default {
  Video: {
    tMountain: ({ id }) => client.t_Mountain.findMany({ where: { video: { some: { id } } } }),
  },
}
