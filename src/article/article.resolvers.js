import client from "../client"
import cheerio from "cheerio"
const axios = require("axios")

export default {
  Article: {
    tMountain: ({ id }) => client.t_Mountain.findMany({ where: { article: { some: { id } } } }),
    ogPreview: async ({ id }) => {
      const article = await client.article.findUnique({ where: { id } })
      let ogData = {
        title: "",
        image: "",
        description: "",
      }

      // description 길이 조절
      const modifyLength = (text) => {
        const limitLength = 50
        if (text.length > limitLength) {
          return text.substring(0, limitLength) + "..."
        } else {
          return text
        }
      }

      // 정보 얻어오기
      const getHtml = async () => {
        try {
          return await axios.get(article.url)
        } catch (error) {
          console.log(error)
        }
      }

      // 데이터 추출
      await getHtml().then((html) => {
        const $ = cheerio.load(html.data)
        // console.log(html)
        const description = $('meta[property="og:description"]').attr("content")

        ogData.title = $('meta[property="og:title"]').attr("content")
        ogData.image = $('meta[property="og:image"]').attr("content")
        ogData.description = modifyLength(description)
      })

      return ogData
    },
  },
}
