import { IUser } from "../interfaces/Iuser";

export abstract class BaseUser implements IUser {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  abstract login(): string;
  abstract signup(): string;
}