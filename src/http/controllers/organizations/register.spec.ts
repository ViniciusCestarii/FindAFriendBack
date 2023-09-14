import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register a organization (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a organization", async () => {
    const registerOrganizationResponse = await request(app.server)
      .post(`/organizations`)
      .send({
        cnpj: "48.390.507/0001-25",
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
        cep: "12345-876",
        city: "Natal",
        phone: "123456",
        state: "RN",
        street: "Rua",
        description: undefined,
        imageUrls: [],
      });

    expect(registerOrganizationResponse.status).toBe(201);
  });
});
