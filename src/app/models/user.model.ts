import { Interface } from 'node:readline';

export interface User {
  access_token?: string;
  name?: string;
  username?: string;
  id?: string;
}

export interface UserName {
  name: string;
}
