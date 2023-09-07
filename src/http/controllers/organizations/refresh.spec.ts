import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh Organization Token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to refresh a organization token", async () => {
    await request(app.server).post("/organizations").send({
      name: "John Doe",
      cnpj: "48.390.507/0001-25",
      email: "johndoe@example.com",
      password: "123456",
      cep: "12345-876",
      city: "Natal",
      phone: "123456789",
      state: "RN",
      street: "Rua",
      description: undefined,
      imageUrls: [],
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const cookies = authResponse.get("set-cookie");

    const refreshReponse = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(refreshReponse.status).toBe(200);
    expect(refreshReponse.body.token).toEqual(expect.any(String));
    expect(refreshReponse.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
