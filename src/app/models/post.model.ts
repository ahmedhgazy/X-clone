export interface Post {
  content?: string;
  repost?: string;
  images?: Image[];
  type?: string;
}
export interface Image {
  img?: string;
}
