import { MediaItem, MediaItemTag } from "@sharedTypes/DBTypes";
import { fetchAllMedia, fetchMediaById, fetchMediaByTag, putMedia, postMedia ,postTagToMedia } from "../models/mediaModel";

export default {
  Query: {
    mediaItems: async () => {
      return await fetchAllMedia();
    },
    mediaItem: async (_parent: undefined, args: {media_id: string}) => {
      return await fetchMediaById(Number(args.media_id));
    },
    mediaItemsByTag: async (_parent: undefined, args: { tag: string }) => {
      return await fetchMediaByTag(args.tag)
    }
  },
  Mutation: {
    createMediaItem: async (_parent: undefined, args: {input: Omit<MediaItem, 'media_id' | 'created_at' | 'thumbnail'>}) => {
      return await postMedia(args.input)
    },
    addTagToMediaItem: async (_parent: undefined, args: {input: MediaItemTag }) => {
      const { media_id, tag_id } = args.input;
      const mI = String(media_id)
      return await postTagToMedia(mI, tag_id)
    },
    updateMediaItem: async (_parent: undefined, args: {input: Pick<MediaItem, 'title' | 'description'>; media_id: string }) => {
      return await putMedia(args.input, Number(args.media_id))
    },
  },
}
