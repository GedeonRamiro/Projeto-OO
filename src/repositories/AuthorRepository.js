import { Repository } from "./Repository.js";
import { Author } from "../entities/Author.js";

export class AuthorRepository extends Repository {
  constructor(Storage) {
    super(Storage);
    this.setStorageTable("user");
  }

  async save(author) {
    const newAuthor = await super.save(author);
    return new Author(newAuthor);
  }

  async getById(id) {
    const author = await super.getById(id);
    return new Author(author);
  }

  async getAll() {
    const authors = await super.getAll();
    return authors.map((author) => new Author(author));
  }
}
