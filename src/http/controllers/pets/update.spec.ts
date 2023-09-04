import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrganization } from "@/utils/test/createAndAuthenticateOrganization";
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
    const { token, id } = await createAndAuthenticateOrganization(app);

    const pet = await prisma.pet.create({
      data: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        sex: "FEMALE",
        size: "SMALL",
        specie: "DOG",
        organizationId: id,
        description: "some description",
        isAdopted: false,
      },
    });

    const petToUpdate = pet;

    petToUpdate.isAdopted = true;
    petToUpdate.description = "some super description";

    const updatePetResponse = await request(app.server)
      .put(`/pet/${pet.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...petToUpdate, imageUrls: [] });

    const updatedPet = await prisma.pet.findUniqueOrThrow({
      where: { id: pet.id },
    });

    expect(updatePetResponse.status).toBe(200);
    expect(updatedPet.isAdopted).toBe(true);
    expect(updatedPet.description).toBe("some super description");
  });
});
