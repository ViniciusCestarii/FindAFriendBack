export class OrganizationAlredyExistsError extends Error {
  constructor() {
    super("Organization already exists.");
  }
}
