import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeAuthenticateOrganizationService } from "@/services/factories/organizations/makeAuthenticateOrganization";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticateOrganizationBodySchema = z.object({
    password: z.string(),
    email: z.string().email(),
  });

  const { email, password } = authenticateOrganizationBodySchema.parse(
    request.body,
  );

  const authenticateOrganizationService = makeAuthenticateOrganizationService();

  try {
    await authenticateOrganizationService.execute({
      email,
      password,
    });

    return reply.status(200).send();
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(401).send(err.message);
    }
  }
};
