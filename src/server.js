require("dotenv").config()
import express from "express"
import logger from "morgan"
import http from "http"
import { ApolloServer } from "apollo-server-express"
import { typeDefs, resolvers } from "./schema"
import { getUser } from "./users/users.utils"
import { PrismaDelete } from "@paljs/plugins"
import client from "./client"

const PORT = process.env.PORT
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  // playground: true,
  // introspection: true,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        prismaDelete: new PrismaDelete(client),
      }
    } else {
      // 웹소캣이면(subscription, req&res 존재X) context User 전달 방식
      const {
        connection: { context },
      } = ctx
      return {
        loggedInUser: context.loggedInUser,
      }
    }
  },
  subscriptions: {
    onConnect: async ({ token }) => {
      // public한 subscript 추가하려면 이것 제거해야됨
      if (!token) {
        throw new Error("You can't listen.")
      }

      const loggedInUser = await getUser(token)
      return {
        loggedInUser,
      }
    },
  },
})

const app = express() // express 선언
app.use(logger("tiny")) // 모든 요청 실시간 확인 가능
apollo.applyMiddleware({ app }) // express를 사용해 apollo server 돌리기
app.use("/static", express.static("uploads"))

const httpServer = http.createServer(app)
apollo.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}/`)
})
