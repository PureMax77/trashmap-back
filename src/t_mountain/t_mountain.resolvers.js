import client from "../client"

export default {
  T_Mountain: {
    article: ({ id }) =>
      client.article.findMany({
        where: { tMountain: { some: { id } } },
      }),
    video: ({ id }) =>
      client.video.findMany({
        where: { tMountain: { some: { id } } },
      }),
  },
}
