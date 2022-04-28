import client from "../../client";

export default {
  Query: {
    seeTMountain: async (_, { id }) => {
      const a = await client.t_Mountain.findUnique({ where: { id } });
      console.log(a);
      return a;
    },
  },
};
