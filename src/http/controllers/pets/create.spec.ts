import { app } from "@/app";
import { createAndAuthenticateOrganization } from "@/utils/test/createAndAuthenticateOrganization";
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
    const { token, id } = await createAndAuthenticateOrganization(app);

    const data = {
      name: "pet name",
      organizationId: id,
      birthDate: new Date("2021-09-09"),
      sex: "FEMALE",
      size: "SMALL",
      specie: "DOG",
      imageUrls: undefined,
    };

    const createPetResponse = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send(data);

    expect(createPetResponse.status).toBe(201);
  });
});
