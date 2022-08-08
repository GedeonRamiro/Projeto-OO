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

  async findAll() {
    return Object.entries(this.#storage)
      .filter(([entryKey]) => entryKey.startsWith(this.table))
      .map(([_, entryKey]) => JSON.parse(entryKey));
  }

  async findOneAndUpdate(id, data) {
    const item = await this.findOne(id);

    if (!item) {
      throw new Error(`Registro ${id} não encontrado em ${this.table}`);
    }

    const newData = {
      ...item,
      ...data,
      id: item.id,
    };

    this.#storage.setItem(this.#getKey(id), JSON.stringify(newData));

    return this.findOne(id);
  }

  async remove(id) {
    this.#storage.removeItem(this.#getKey(id));
    return true;
  }

  async removeAll() {}

  #getKey(id) {
    return `${this.#table}-${id}`;
  }

  #generateId() {
    const gen = () => Math.floor(Date.now() * Math.random()).toString(36);
    return `${gen()}-${gen()}-${gen()}`;
  }
}
