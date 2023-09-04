import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate a organization (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate a organization", async () => {
    const passwordHash = await hash("123456", 6);

    await prisma.organization.create({
      data: {
        cep: "12345-876",
        city: "Natal",
        email: "johndoe@example.com",
        name: "John Doe",
        passwordHash,
        phone: "123456789",
        state: "RN",
        street: "Rua",
      },
    });

    const authenticateOrganizationResponse = await request(app.server)
      .post(`/sessions`)
      .send({
        email: "johndoe@example.com",
        password: "123456",
      });

    expect(authenticateOrganizationResponse.status).toBe(200);
    expect(authenticateOrganizationResponse.body).toEqual({
      token: expect.any(String),
    });
  });
});
