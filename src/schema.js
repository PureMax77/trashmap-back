import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools"

// __dirname은 현재 실행 파일의 경로를 나타냄
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`)
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`)

export const typeDefs = mergeTypeDefs(loadedTypes)
export const resolvers = mergeResolvers(loadedResolvers)
