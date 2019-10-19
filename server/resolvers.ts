import md5 from 'md5';
import { users, posts, tags } from './data';
import { User, Post, Tag } from './types.d';
import {
  MutationAddUserArgs,
  MutationAddPostArgs,
  QuerySearchArgs,
  SearchType,
  MutationUpdatePostArgs,
  QueryUserArgs,
  QueryPostArgs,
  QueryTagArgs,
} from '../schema.d';

export default {
  Query: {
    users: () => users,
    user: (_: any, { where }: QueryUserArgs) => users.find(({ id }) => id === where),
    posts: () => posts,
    post: (_: any, { where }: QueryPostArgs) => posts.find(({ id }) => id === where),
    tags: () => tags,
    tag: (_: any, { where }: QueryTagArgs) => tags.find(({ id }) => id === where),
    search: (_: any, { text }: QuerySearchArgs) => [
      users.filter(({ name, email }) => name.match(text) || email.match(text)),
      posts.filter(({ title, content }) => title.match(text) || content.match(text)),
      tags.filter(({ name }) => name.match(text)),
    ].flat(),
  },

  SearchType: {
    __resolveType: (data: SearchType) => ('email' in data && 'User')
      || ('name' in data && 'Tag')
      || ('title' in data && 'Post')
      || null,
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
    addUser: (_: any, { data: { name, email, avatar } }: MutationAddUserArgs): User => {
      const newUser: User = {
        name,
        email,
        avatar: avatar || md5(email),
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
        cover: '',
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
    updatePost: (_: any, {
      where,
      data: {
        title,
        content,
        tags: inputTags,
      },
    }: MutationUpdatePostArgs) => {
      const post = posts.find(({ id }) => id === where);
      if (!post) {
        throw new Error('No post found to update!');
      }
      if (title) {
        post.title = title;
      }
      if (content) {
        post.content = content;
      }
      if (inputTags) {
        const { ADD, REMOVE, SET } = inputTags;
        const tagIds = tags.map(({ id }) => id);
        post.tags = post.tags || [];
        if (SET) {
          post.tags = SET.filter(it => tagIds.includes(it));
        } else if (ADD && !post.tags.includes(ADD) && tagIds.includes(ADD)) {
          post.tags.push(ADD);
        } else if (REMOVE && post.tags.includes(REMOVE) && tagIds.includes(REMOVE)) {
          post.tags = post.tags.filter(it => it !== REMOVE);
        }
      }
      return post;
    },
  },
};
