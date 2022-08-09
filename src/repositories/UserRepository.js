import { User } from "../entities/User.js";

export class UserRepository {
  #LStorage;
  constructor(Storage) {
    this.#LStorage = new Storage("user");
  }

  async save(data) {
    const user = await this.#LStorage.save(data);
    return new User(user);
  }
}
