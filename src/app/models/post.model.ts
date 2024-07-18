export interface Post {
  content?: string;
  images?: Image[];
}
export interface Image {
  img?: string;
}

export interface UserPost {
  post?: Post;
  likes?: number;
  comments?: number;
  reposts?: number;
}

export interface Post {
  _id?: string;
  content?: string;
  user?: string;
  repost?: string;
  images?: Image[];
  type?: string;
  createdAt?: string;
}

export interface UserInfo {
  id: string;
  profileImage: string;
  coverImage: string;
  bio: string;
  birthDate: string;
  location: string;
  website: string;
  isPrivate: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserActions {
  posts: 0;
  followers: 0;
  following: 0;
  media: 0;
}
export interface UserDetails {
  posts?: 0;
  followers?: 0;
  following?: 0;
  media?: 0;
  id?: string;
  profileImage?: string;
  coverImage?: string;
  bio?: string;
  birthDate?: string;
  location?: string;
  website?: string;
  isPrivate?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
  post?: Post;
  likes?: number;
  comments?: number;
  reposts?: number;
}
