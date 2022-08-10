export class Repository {
  #LStorage;
  constructor(Storage) {
    this.#LStorage = new Storage();
  }

  setStorageTable(table) {
    this.#LStorage.table = table;
  }

  async save(resource) {
    return this.#LStorage.save(resource.toObject());
  }

  async getById(id) {
    const resource = this.#LStorage.findOne(id);
    if (!resource) throw new Error(`Usuário ${id} não encontrado!`);
    return resource;
  }

  async getAll() {
    return this.#LStorage.findAll();
  }

  async update(resource) {
    return this.#LStorage.findOneAndUpdate(resource.id, resource.toObject());
  }

  async remove(id) {
    return this.#LStorage.remove(id);
  }

  async removeAll() {
    return this.#LStorage.removeAll();
  }
}
