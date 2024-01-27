import {Tag} from '@sharedTypes/DBTypes';
import {
  deleteTag,
  fetchAllTags,
  fetchTagsByMediaId,
  postTag,
} from '../models/tagModel';

export default {
  MediaItem: {
    tags: async (parent: {media_id: string}) => {
      return await fetchTagsByMediaId(Number(parent.media_id));
    },
  },
  Query: {
    tags: async () => {
      return await fetchAllTags();
    },
    /* tag : async (_parent: undefined, args: {tag_id: string}) => {
      const tag = await
    }, */
  },
  Mutation: {
    createTag: async (
      _parent: undefined,
      args: {input: Omit<Tag, 'tag_id'>},
    ) => {
      return await postTag(args.input);
    },
    deleteTag: async (_parent: undefined, args: {input: string}) => {
      const id = Number(args.input);
      return await deleteTag(id);
    },
  
  },
};
