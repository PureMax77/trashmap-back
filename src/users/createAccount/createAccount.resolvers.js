import bcrypt from "bcrypt"
import client from "../../client"

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      try {
        // username, email 중복 체크
        const existingEmail = await client.user.findFirst({
          where: {
            email,
          },
        })
        if (existingEmail) {
          throw new Error("같은 email이 이미 존재합니다.")
        }
        const existingUsername = await client.user.findFirst({
          where: {
            username,
          },
        })
        if (existingUsername) {
          throw new Error("같은 닉네임이 이미 존재합니다.")
        }

        // 비밀번호 Hash
        const uglyPassword = await bcrypt.hash(password, 10)

        // save and return the user
        await client.user.create({
          data: {
            username,
            email,
            password: uglyPassword,
          },
        })
        return {
          ok: true,
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        }
      }
    },
  },
}
