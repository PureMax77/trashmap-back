import client from "../client"
import cheerio from "cheerio"
import { deleteInS3 } from "../shared/shared.utils"
const axios = require("axios")

export default {
  Mutation: {
    test: async (_, { url }) => {
      const getHtml = async () => {
        try {
          return await axios.get(url)
        } catch (error) {
          console.log(error)
        }
      }

      getHtml().then((html) => {
        let ulList = []
        const $ = cheerio.load(html.data)
        console.log(html)
        console.log($('meta[property="og:title"]').attr("content"))
        console.log($('meta[property="og:image"]').attr("content"))
        console.log($('meta[property="og:image:width"]').attr("content"))
        console.log($('meta[property="og:image:height"]').attr("content"))
        console.log($('meta[property="og:description"]').attr("content"))
      })

      return {
        ok: true,
      }
    },
  },
}
