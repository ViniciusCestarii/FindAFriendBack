import { PrismaOrganizationsRepository } from "@/repositories/prisma/prismaOrganizationsRepository";
import { RegisterOrganizationService } from "@/services/organizations/registerOrganization";

export const makeRegisterOrganizationService = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const service = new RegisterOrganizationService(
    prismaOrganizationsRepository,
  );

  return service;
};
