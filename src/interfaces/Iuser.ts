export interface IUser {
  name: string;
  email: string;
  password: string;
  login(): string;
  signup(): string;
}