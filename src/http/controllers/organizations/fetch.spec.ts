import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Fetch a organization (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch a organization", async () => {
    const organization = await prisma.organization.create({
      data: {
        cnpj: "48.390.507/0001-25",
        name: "John Doe",
        email: "johndoe@example.com",
        passwordHash: await hash("123456", 6),
        cep: "12345-876",
        city: "Natal",
        phone: "123456",
        state: "RN",
        street: "Rua",
      },
    });

    const fetchOrganizationResponse = await request(app.server)
      .get(`/organization/${organization.id}`)
      .send();

    expect(fetchOrganizationResponse.status).toBe(200);
    expect(fetchOrganizationResponse.body).toEqual(
      expect.objectContaining({
        id: organization.id,
      }),
    );
  });
});
