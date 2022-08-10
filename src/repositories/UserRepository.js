import { User } from "../entities/User.js";

export class UserRepository {
  #LStorage;
  constructor(Storage) {
    this.#LStorage = new Storage("user");
  }

  async save(user) {
    const newUser = await this.#LStorage.save(user.toObject());
    return new User(newUser);
  }

  async getById(id) {
    const user = await this.#LStorage.findOne(id);
    if (!user) throw new Error(`Usuário ${id} não encontrado!`);
    return new User(user);
  }

  async getAll() {
    const users = await this.#LStorage.findAll();
    return users.map((user) => new User(user));
  }

  async update(user) {
    return this.#LStorage.findOneAndUpdate(user.id, user.toObject());
  }

  async remove(id) {
    return this.#LStorage.remove(id);
  }

  async removeAll() {
    return this.#LStorage.removeAll();
  }
}
