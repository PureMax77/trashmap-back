import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default {
  Mutation: {
    createComment: protectedResolver(async (_, { photoId, payload }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: { id: photoId },
      })
      if (!photo) {
        return {
          ok: false,
          error: "해당 사진이 없습니다.",
        }
      }

      const newComment = await client.comment.create({
        data: {
          payload,
          photo: {
            connect: { id: photoId },
          },
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
        },
      })
      return {
        ok: true,
        id: newComment.id,
      }
    }),
  },
}
