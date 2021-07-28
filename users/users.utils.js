import jwt from "jsonwebtoken"
import client from "../client"

export const getUser = async (token) => {
  try {
    if (!token) {
      return null
    }

    // 토큰에 넣은 사용자 id 꺼내와서 쓰기 위해서
    const { id } = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await client.user.findUnique({ where: { id } })
    if (user) {
      return user
    } else {
      return null
    }
  } catch {
    return null
  }
}

export const protectedResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    // 해당 요청이 쿼리인지 뮤테이셔인지 검증
    const isQuery = info.operation.operation === "query"

    if (isQuery) {
      return null
    } else {
      return {
        ok: false,
        error: " 로그인이 필요합니다.",
      }
    }
  }
  return ourResolver(root, args, context, info)
}
