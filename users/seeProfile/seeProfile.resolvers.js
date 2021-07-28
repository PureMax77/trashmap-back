import client from "../../client"

export default {
  Query: {
    seeProfile: (_, { username }) =>
      //findUnique는 findFirst 와 다름 유니크한 변수만 찾아봄
      client.user.findUnique({
        where: { username },
        include: {
          following: true,
          followers: true,
        },
      }),
  },
}
