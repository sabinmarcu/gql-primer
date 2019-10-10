import { users, posts, tags } from './data';
import { User, Post, Tag } from './types.d';
import { MutationAddUserArgs, MutationAddPostArgs } from '../schema.d';

export default {
  Query: {
    users: () => users,
    posts: () => posts,
    tags: () => tags,
  },
  User: {
    posts: ({ id }: User) => posts.filter(({ owner }: Post) => owner === id) || [],
  },
  Post: {
    owner: ({ owner }: Post) => users.find(({ id }: User) => id === owner),
    tags: ({ tags: innerTags }: Post) => (innerTags
      ? tags.filter(({ id }: Tag) => innerTags.includes(id))
      : []),
  },
  Tag: {
    related: ({ related }: Tag) => (related
      ? tags.filter(({ id }: Tag) => related.includes(id))
      : []),
    posts: ({ id }: Tag) => posts.filter(
      ({ tags: tagsProp }: Post) => tagsProp && tagsProp.includes(id),
    ),
  },
  Mutation: {
    addUser: (_: any, { data: { name, email } }: MutationAddUserArgs): User => {
      const newUser: User = {
        name,
        email,
        id: users.map(({ id }) => id).sort((a, b) => Math.sign(b - a))[0] + 1,
      };
      users.push(newUser);
      return newUser;
    },
    addPost: (_: any, {
      where,
      data: {
        title,
        content,
        tags: inputTags,
      },
    }: MutationAddPostArgs) => {
      const newPost: Post = {
        id: posts.map(({ id }) => id).sort((a, b) => Math.sign(b - a))[0] + 1,
        owner: where,
        title,
        content,
      };
      if (inputTags) {
        const {
          id: inputId,
          ids,
        } = inputTags;
        const tagIds = tags.map(({ id }) => id);
        if (inputId) {
          if (tagIds.includes(inputId)) {
            newPost.tags = [inputId];
          }
        }
        if (ids) {
          const validIds = ids.filter(id => id && tagIds.includes(id));
          if (validIds.length > 0) {
            newPost.tags = validIds;
          }
        }
      }
      posts.push(newPost);
      return newPost;
    },
  },
};
