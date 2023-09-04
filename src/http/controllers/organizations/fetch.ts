import { ResourceNotFound } from "@/services/errors/resourceNotFound";
import { makeFetchOrganizationtionService } from "@/services/factories/organizations/makeFetchOrganization";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const fetch = async (request: FastifyRequest, reply: FastifyReply) => {
  const fetchOrganizationParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = fetchOrganizationParamsSchema.parse(request.params);

  const fetchOrganizationService = makeFetchOrganizationtionService();

  try {
    const { organization } = await fetchOrganizationService.execute(id);

    return reply.status(200).send({ ...organization, passwordHash: undefined });
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(401).send(err.message);
    }
  }
};
