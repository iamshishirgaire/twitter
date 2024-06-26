export default interface User {
  id: string;

  user_name: string;

  email: string;

  bio: string | null;

  first_name: string | null;

  last_name: string | null;

  country: string | null;

  dob: Date | null;

  following: number;

  followers: number;

  profile_picture: string | null;

  created_at: Date;

  updated_at: Date;
}
