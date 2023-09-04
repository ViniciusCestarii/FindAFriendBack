import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search many pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able search pets", async () => {
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

    await prisma.pet.createMany({
      data: [
        {
          name: "pet name",
          description: "some description",
          organizationId: organization.id,
          birthDate: new Date("2021-09-09"),
          sex: "FEMALE",
          size: "SMALL",
          specie: "DOG",
        },
        {
          name: "pet name",
          description: "some description",
          organizationId: organization.id,
          birthDate: new Date("2021-09-09"),
          sex: "FEMALE",
          size: "SMALL",
          specie: "DOG",
        },
        {
          name: "pet name",
          description: "some description",
          organizationId: organization.id,
          birthDate: new Date("2021-09-09"),
          sex: "FEMALE",
          size: "SMALL",
          specie: "DOG",
        },
        {
          name: "pet name",
          description: "some description",
          organizationId: organization.id,
          birthDate: new Date("2021-09-09"),
          sex: "FEMALE",
          size: "SMALL",
          specie: "CAT",
        },
      ],
    });

    const searchManyPetsResponse = await request(app.server)
      .post("/pets/search")
      .send({
        page: 1,
        specie: "DOG",
      });

    expect(searchManyPetsResponse.status).toBe(200);
    expect(searchManyPetsResponse.body.pets).toHaveLength(3);
  });
});
