import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeFetchOrganizationtionService } from "@/services/factories/organizations/makeFetchOrganization";
import { FastifyReply, FastifyRequest } from "fastify";

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const fetchOrganizationService = makeFetchOrganizationtionService();

  try {
    const { organization } = await fetchOrganizationService.execute(
      request.user.sub,
    );

    return reply.status(200).send({ ...organization, passwordHash: undefined });
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send(err.message);
    }
  }
};
