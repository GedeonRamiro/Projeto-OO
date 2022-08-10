import { Author } from "../entities/Author.js";

export class AuthorRepository {
  #LStorage;
  constructor(Storage) {
    this.#LStorage = new Storage("author");
  }

  async save(author) {
    const newAuthor = await this.#LStorage.save(author.toObject());
    return new Author(newAuthor);
  }

  async getById(id) {
    const author = await this.#LStorage.findOne(id);
    if (!author) throw new Error(`Autor ${id} não encontrado!`);
    return new Author(author);
  }

  async getAll() {
    const authors = await this.#LStorage.findAll();
    return authors.map((author) => new Author(author));
  }

  async update(author) {
    return this.#LStorage.findOneAndUpdate(author.id, author.toObject());
  }

  async remove(id) {
    return this.#LStorage.remove(id);
  }

  async removeAll() {
    return this.#LStorage.removeAll();
  }
}
