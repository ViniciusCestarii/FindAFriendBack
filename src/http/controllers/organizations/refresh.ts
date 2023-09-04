import { FastifyReply, FastifyRequest } from "fastify";

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify({ onlyCookie: true }); // this will throw an error if the cookie is not present (will ignore header)

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  );

  const refreshToken = await reply.jwtSign(
    {},
    {
      sign: {
        sub: request.user.sub,
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
};
