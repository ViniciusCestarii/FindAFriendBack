export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('Entity with the same e-mail already exists.');
  }
}