import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default {
  Query: {
    seeTMountains: () => {
      try {
        return client.t_Mountain.findMany()
      } catch (e) {
        console.log(e)
        return []
      }
    },
  },
}
