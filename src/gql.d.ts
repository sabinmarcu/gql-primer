export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
  __typename?: 'Mutation',
  addUser?: Maybe<User>,
  addPost?: Maybe<Post>,
  updatePost?: Maybe<Post>,
};


export type MutationAddUserArgs = {
  data: NewUserInput
};


export type MutationAddPostArgs = {
  where: Scalars['Int'],
  data: NewPostDataInput
};


export type MutationUpdatePostArgs = {
  where: Scalars['Int'],
  data: UpdatePostInput
};

export type NewPostDataInput = {
  title: Scalars['String'],
  content: Scalars['String'],
  cover: Scalars['String'],
  tags?: Maybe<NewPostDataTagsInput>,
};

export type NewPostDataTagsInput = {
  ids?: Maybe<Array<Scalars['Int']>>,
  id?: Maybe<Scalars['Int']>,
};

export type NewUserInput = {
  name: Scalars['String'],
  email: Scalars['String'],
  avatar?: Maybe<Scalars['String']>,
};

export type Post = {
  __typename?: 'Post',
  id: Scalars['Int'],
  owner: User,
  title: Scalars['String'],
  cover: Scalars['String'],
  content: Scalars['String'],
  tags?: Maybe<Array<Tag>>,
};

export type Query = {
  __typename?: 'Query',
  users?: Maybe<Array<User>>,
  user?: Maybe<User>,
  posts?: Maybe<Array<Post>>,
  post?: Maybe<Post>,
  tags?: Maybe<Array<Tag>>,
  tag?: Maybe<Tag>,
  search?: Maybe<Array<SearchType>>,
};


export type QueryUserArgs = {
  where: Scalars['Int']
};


export type QueryPostArgs = {
  where: Scalars['Int']
};


export type QueryTagArgs = {
  where: Scalars['Int']
};


export type QuerySearchArgs = {
  text: Scalars['String']
};

export type SearchType = User | Post | Tag;

export type Tag = {
  __typename?: 'Tag',
  id: Scalars['Int'],
  name: Scalars['String'],
  related?: Maybe<Array<Tag>>,
  posts?: Maybe<Array<Post>>,
};

export type UpdatePostInput = {
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  cover?: Maybe<Scalars['String']>,
  tags?: Maybe<UpdatePostTagsInput>,
};

export type UpdatePostTagsInput = {
  ADD?: Maybe<Scalars['Int']>,
  SET?: Maybe<Array<Scalars['Int']>>,
  REMOVE?: Maybe<Scalars['Int']>,
};


export type User = {
  __typename?: 'User',
  id: Scalars['Int'],
  name: Scalars['String'],
  email: Scalars['String'],
  avatar: Scalars['String'],
  posts?: Maybe<Array<Post>>,
};
