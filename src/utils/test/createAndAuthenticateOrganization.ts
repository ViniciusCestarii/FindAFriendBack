import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export const createAndAuthenticateOrganization = async (
  app: FastifyInstance,
) => {
  const organization = await prisma.organization.create({
    data: {
      cnpj: "48.390.507/0001-25",
      name: "John Doe",
      email: "johndoe@example.com",
      passwordHash: await hash("123456", 6),
      cep: "12345-876",
      city: "Natal",
      phone: "123456",
      state: "RN",
      street: "Rua",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "johndoe@example.com",
    password: "123456",
  });

  const id = organization.id;
  const { token } = authResponse.body;

  return {
    token,
    id,
  };
};
