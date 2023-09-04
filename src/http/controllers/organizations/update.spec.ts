import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrganization } from "@/utils/test/createAndAuthenticateOrganization";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Update a organization (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a organization", async () => {
    const { token, id } = await createAndAuthenticateOrganization(app);

    const organization = await prisma.organization.findUniqueOrThrow({
      where: { id },
    });

    const organizationToUpdate = organization;

    organizationToUpdate.description = "some description";

    const updateOrganizationResponse = await request(app.server)
      .put(`/organization`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...organizationToUpdate, imageUrls: [] });

    const updatedOrganization = await prisma.organization.findUniqueOrThrow({
      where: { id },
    });

    expect(updateOrganizationResponse.status).toBe(200);
    expect(updatedOrganization.description).toBe("some description");
  });
});
