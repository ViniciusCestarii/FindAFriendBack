import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrganization } from "@/utils/test/createAndAuthenticateOrganization";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Delete pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a pet", async () => {
    const { token, id } = await createAndAuthenticateOrganization(app);

    const pet = await prisma.pet.create({
      data: {
        name: "pet name",
        organizationId: id,
        birthDate: new Date("2021-09-09"),
        sex: "FEMALE",
        size: "SMALL",
        specie: "DOG",
      },
    });

    const deletePetResponse = await request(app.server)
      .delete(`/pet/${pet.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ id: pet.id });

    expect(deletePetResponse.status).toBe(200);
  });
});
