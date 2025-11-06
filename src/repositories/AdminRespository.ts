import { BaseRepository } from "./BaseRepository";
import { UserModel } from "../entities/AdminEntity";

export class AdminRepository extends BaseRepository<typeof AdminEntity> {
  constructor() {
    super(AdminEntity);
  }
}