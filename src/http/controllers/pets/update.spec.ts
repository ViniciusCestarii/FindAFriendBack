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
      },
    });

    const petToUpdate = pet;

    petToUpdate.isAdopted = true;

    const updatePetResponse = await request(app.server)
      .put(`/pet/${pet.id}`)
      .send({ ...petToUpdate, imageUrls: [] });

    const updatedPet = await prisma.pet.findUniqueOrThrow({
      where: { id: pet.id },
    });

    expect(updatePetResponse.status).toBe(200);
    expect(updatedPet.isAdopted).toBe(true);
  });
});
