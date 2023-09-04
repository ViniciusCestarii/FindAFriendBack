import { InvalidCredentialsError } from "@/services/errors/invalidCredentialsError";
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
    const { organization } = await authenticateOrganizationService.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    );

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
          expiresIn: "7d",
        },
      },
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/", // all back can access this cookie
        secure: true, // HTTPS only
        sameSite: true, // only send cookie if the request is comming from the same origin
        httpOnly: true, // only send cookie over HTTP(S), not client JavaScript, this will prevent XSS attacks
      })
      .status(200)
      .send({
        token,
      });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send(err.message);
    }
  }
};
