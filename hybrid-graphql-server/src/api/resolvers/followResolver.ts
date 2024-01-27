import { addFollow, deleteFollow, followersList } from "../models/followModel"

export default {
  Query: {
    followers: async (_parent: undefined, args: { userId: number}) => {
      return await followersList(args.userId);
    },
    following: async (_parent: undefined, args: { userId: number}) => {
      return await followersList(args.userId);
    }
  },
  Mutation : {
    follow: async (_parent: undefined, args: {input: { followerId: number, followingId: number }}) => {
      const success =  await addFollow(args.input.followerId, args.input.followingId);
      if (success) {
        return { success, message: "Followed successfully" };
      } else {
        return { success, message: "Failed to follow" };
      }
    },
    unfollow: async (_parent: undefined, args: {input: {followerId: number, followingId: number}}) => {
      const success = await deleteFollow(args.input.followerId, args.input.followingId);
      if (success) {
        return { success, message: "Unfollowed successfully" };
      } else {
        return { success, message: "Failed to unfollow" };
      }
   },
  }
}
