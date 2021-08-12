import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser, prismaDelete }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      })
      if (!photo) {
        return {
          ok: false,
          error: "해당 사진이 없습니다.",
        }
      } else if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "해당 권한이 없습니다.",
        }
      } else {
        await prismaDelete.onDelete({
          model: "Photo",
          where: {
            id,
          },
          // 하위 항목 뿐만 아니라 자기 자신도 삭제한다는 의미
          deleteParent: true,
        })
        // 이렇게하면 하위 항목들이 연결돼있어서 삭제가 안됨
        // await client.photo.delete({
        //   where: {
        //     id,
        //   },
        // })
        return {
          ok: true,
        }
      }
    }),
  },
}
