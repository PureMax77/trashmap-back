import bcrypt from "bcrypt"
import client from "../../client"
import jwt from "jsonwebtoken"

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({ where: { username } })
      if (!user) {
        return {
          ok: false,
          error: "사용자가 없습니다.",
        }
      }
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password)
      if (!passwordOk) {
        return {
          ok: false,
          error: "비밀번호가 일치하지 않습니다.",
        }
      }
      // 토큰 발행 및 보내기
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY)
      return {
        ok: true,
        token,
      }
    },
  },
}
