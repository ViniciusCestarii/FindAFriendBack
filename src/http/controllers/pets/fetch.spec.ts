import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Fetch a pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able fetch a pet", async () => {
    const organization = await prisma.organization.create({
      data: {
        cnpj: "48.390.507/0001-25",
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

    const pet = await prisma.pet.create({
      data: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        sex: "FEMALE",
        size: "SMALL",
        specie: "DOG",
        organizationId: organization.id,
        description: "some description",
        isAdopted: false,
        energyLevel: 1,
      },
    });

    const createPetResponse = await request(app.server)
      .get(`/pet/${pet.id}`)
      .send();

    expect(createPetResponse.status).toBe(200);
    expect(createPetResponse.body).toEqual(
      expect.objectContaining({
        id: pet.id,
      }),
    );
  });
});
