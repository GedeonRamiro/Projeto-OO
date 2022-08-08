export class Storage {
  #table;
  #storage;

  constructor(table) {
    this.#table = table;
    this.#storage = window.localStorage;
  }

  get table() {
    return this.#table;
  }

  set table(table) {
    return (this.#table = table);
  }

  async save(data) {
    const id = this.#generateId();

    const newData = {
      id,
      ...data,
    };

    this.#storage.setItem(this.#getKey(id), JSON.stringify(newData));
  }

  async findOne(id) {
    return JSON.parse(this.#storage.getItem(this.#getKey(id)));
  }

  async findAll() {}

  async findOneAndUpdate(id, data) {}

  async remove(id) {}

  async removeAll() {}

  #getKey(id) {
    return `${this.#table}-${id}`;
  }

  #generateId() {
    const gen = () => Math.floor(Date.now() * Math.random()).toString(36);
    return `${gen()}-${gen()}-${gen()}`;
  }
}
