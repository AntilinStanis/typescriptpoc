import { User } from "../models/users.model";

export class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ where: { email, isDeleted: false } });
  }

  async create(data: Partial<User>) {
    return User.create(data);
  }

  async updateToken(userId: number, token: string, expires: Date) {
    return User.update(
      { token, tokenExpires: expires },
      { where: { id: userId } }
    );
  }
}
