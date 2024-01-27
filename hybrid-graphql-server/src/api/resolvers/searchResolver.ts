import { searchByUserAndMedia } from "../models/searchModel"




export default {
  Query: {
    search: async (_parent: undefined, args: {term : string}) => {
      return await searchByUserAndMedia(args.term)
    },
  },
}
