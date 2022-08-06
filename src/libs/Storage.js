export class Storage {
  #table;

  constructor(table) {
    this.#table = table;
  }

  get table() {
    return this.#table;
  }

  set table(table) {
    return (this.#table = table);
  }

  async save(data) {
    const id = this.#generateId();
    const key = `${this.#table}-${id}`;

    const newData = {
      id,
      ...data,
    };

    localStorage.setItem(key, JSON.stringify(newData));
  }

  #generateId() {
    const gen = () => Math.floor(Date.now() * Math.random()).toString(36);
    return `${gen()}-${gen()}-${gen()}`;
  }

  async findOne(id) {}

  async findAll() {}

  async findOneAndUpdate(id, data) {}

  async remove(id) {}

  async removeAll() {}
}
