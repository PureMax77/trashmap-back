import client from "../../client"

export default {
  Query: {
    seeVideos: (_, { offset }) => client.video.findMany({ take: 4, skip: offset }),
  },
}
