import client from "../client"
import { deleteInS3 } from "../shared/shared.utils"

export default {
  Mutation: {
    test: async (_, { url }) => {
      await client.t_Mountain.updateMany({
        data: {
          image:
            "https://trashmap-fold.s3.ap-northeast-2.amazonaws.com/TMountain-img/defaultMountain.jpg",
        },
      })
      return {
        ok: true,
      }
    },
  },
}
