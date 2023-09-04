import { app } from "@/app";
import { createAndAuthenticateOrganization } from "@/utils/test/createAndAuthenticateOrganization";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Fetch a organization profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to fetch a organization profile", async () => {
    const { token, id } = await createAndAuthenticateOrganization(app);

    const fetchOrganizationResponse = await request(app.server)
      .get(`/me`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(fetchOrganizationResponse.status).toBe(200);
    expect(fetchOrganizationResponse.body).toEqual(
      expect.objectContaining({
        id,
      }),
    );
  });
});
