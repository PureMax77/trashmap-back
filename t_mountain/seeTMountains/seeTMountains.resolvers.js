import client from "../../client"
import { protectedResolver } from "../../users/users.utils"

export default {
  Query: {
    seeTMountains: () => client.t_Mountain.findMany(),
  },
}
