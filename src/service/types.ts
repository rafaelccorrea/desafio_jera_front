export type User = {
  email: string;
  id: number;
  exp: number;
  iat: number;
  profiles: Profile[];
};

export interface Profile {
  id: number;
  name: string;
  isPrimary: boolean;
}
