import { Model } from "sequelize";

export class BaseRepository<T extends Model> {
  constructor(private model: any) {}

  async create(data: any) {
    return this.model.create(data);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ where: { email } });
  }
}