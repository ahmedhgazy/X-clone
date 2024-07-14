export interface Post {
  content?: string;
  images?: Image[];
}
export interface Image {
  img?: string;
}

export interface UserPosts {
  posts: UserPost[];
}

export interface UserPost {
  id?: string;
  content?: string;
  user?: string;
  repost?: string;
  images?: string[];
  type?: string;
  createdAt?: string;
}
// export interface UserPost {}
