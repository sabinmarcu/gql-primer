import { User, Post, Tag } from './types.d';

export const users: User[] = [
  {
    id: 1,
    name: 'Sabin Marcu',
    email: 'sabinmarcu@gmail.com',
  },
  {
    id: 2,
    name: 'Diana Gagean',
    email: 'diana.gagean@gmail.com',
  },
];
export const posts: Post[] = [
  {
    id: 1,
    owner: 1,
    title: 'SM Post 1',
    content: '',
  },
  {
    id: 2,
    owner: 1,
    title: 'SM Post 2',
    content: '',
  },
  {
    id: 3,
    owner: 2,
    title: 'DG Post 1',
    content: '',
  },
  {
    id: 4,
    owner: 2,
    title: 'DG Post 2',
    content: '',
  },
  {
    id: 5,
    owner: 2,
    title: 'DG Post 3',
    content: '',
  },
  {
    id: 6,
    owner: 2,
    title: 'DG Post 4',
    content: '',
  },
];
export const tags: Tag[] = [];
