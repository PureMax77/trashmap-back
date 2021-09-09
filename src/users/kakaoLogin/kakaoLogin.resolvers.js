const axios = require("axios")

export default {
  Mutation: {
    kakaoLogin: async (_, { token }) => {
      console.log(token)
      let user

      // 엑세스토큰으로 카카오에서 개인정보 받아오기
      try {
        user = await axios({
          method: "get",
          url: "https://kapi.kakao.com/v2/user/me",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (e) {
        console.log(e)
        return {
          ok: false,
          error: "로그인에 실패했습니다.",
        }
      }
      console.log(user.data)

      // 토큰 발행 및 보내기
      return {
        ok: true,
        token: "",
      }
    },
  },
}
