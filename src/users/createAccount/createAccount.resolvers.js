import bcrypt from "bcrypt"
import client from "../../client"

export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      try {
        // username, email 중복 체크
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        })
        if (existingUser) {
          throw new Error("같은 닉네임 또는 이메일이 이미 존재합니다.")
        }

        // 비밀번호 Hash
        const uglyPassword = await bcrypt.hash(password, 10)

        // save and return the user
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        })
        return {
          ok: true,
        }
      } catch (e) {
        return {
          ok: false,
          error: "새로운 계정을 만들 수 없습니다. "
        }
      }
    },
  },
}
