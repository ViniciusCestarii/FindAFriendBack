import { PrismaOrganizationsRepository } from "@/repositories/prisma/prismaOrganizationsRepository";
import { AuthenticateOrganizationService } from "@/services/organizations/authenticateOrganization";

export const makeAuthenticateOrganizationService = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const service = new AuthenticateOrganizationService(
    prismaOrganizationsRepository,
  );

  return service;
};
