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
};


export type MutationAddUserArgs = {
  data: NewUserInput
};


export type MutationAddPostArgs = {
  where: Scalars['Int'],
  data: NewPostDataInput
};

export type NewPostDataInput = {
  title: Scalars['String'],
  content: Scalars['String'],
  tags?: Maybe<NewPostDataTagsInput>,
};

export type NewPostDataTagsInput = {
  ids?: Maybe<Array<Scalars['Int']>>,
  id?: Maybe<Scalars['Int']>,
};

export type NewUserInput = {
  name: Scalars['String'],
  email: Scalars['String'],
};

export type Post = {
  __typename?: 'Post',
  id: Scalars['Int'],
  owner: User,
  title: Scalars['String'],
  content: Scalars['String'],
  tags?: Maybe<Array<Tag>>,
};

export type Query = {
  __typename?: 'Query',
  users?: Maybe<Array<User>>,
  posts?: Maybe<Array<Post>>,
  tags?: Maybe<Array<Tag>>,
};

export type Tag = {
  __typename?: 'Tag',
  id: Scalars['Int'],
  name: Scalars['String'],
  related?: Maybe<Array<Tag>>,
  posts?: Maybe<Array<Post>>,
};


export type User = {
  __typename?: 'User',
  id: Scalars['Int'],
  name: Scalars['String'],
  email: Scalars['String'],
  posts?: Maybe<Array<Post>>,
};
