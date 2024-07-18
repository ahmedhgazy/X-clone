export interface User {
  access_token?: string;
  name?: string;
  username?: string;
  id?: string;
}

export interface UserProfileDTO {
  name?: string;
  bio?: string;
  birthDate?: Date;
  location?: string;
  website?: string;
  isPrivate?: true;
}

export class UserProfileInfo {
  constructor(
    public bio: string,
    public location: string,
    public website: string,
    public birthDate?: Date
  ) {}
}
