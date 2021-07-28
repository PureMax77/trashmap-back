import { deleteInS3 } from "../shared/shared.utils"

export default {
  Mutation: {
    test: async (_, { url }) => {
      await deleteInS3(url)
      return {
        ok: true,
      }
    },
  },
}
