import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Update a pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a pet", async () => {
    const organization = await prisma.organization.create({
      data: {
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

    const organizationToUpdate = organization;

    organizationToUpdate.description = "some description";

    const createOrganizationResponse = await request(app.server)
      .put(`/organization/${organization.id}`)
      .send({ ...organizationToUpdate, imageUrls: [] });

    const updatedOrganization = await prisma.organization.findUniqueOrThrow({
      where: { id: organization.id },
    });

    expect(createOrganizationResponse.status).toBe(200);
    expect(updatedOrganization.description).toBe("some description");
  });
});
