import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    const organization = await prisma.organization.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        passwordHash: await hash("123456", 6),
        cep: "123456",
        city: "Natal",
        phone: "123456",
        state: "RN",
        street: "Rua",
      },
    });

    const data = {
      name: "pet name",
      description: "some description",
      organizationId: organization.id,
      birthDate: new Date("2021-09-09"),
      sex: "FEMALE",
      size: "SMALL",
      specie: "DOG",
      imageUrls: undefined,
    };

    const createPetResponse = await request(app.server)
      .post("/pets")
      .send(data);

    expect(createPetResponse.status).toBe(201);
  });
});
