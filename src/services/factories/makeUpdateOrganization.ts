import { PrismaOrganizationsRepository } from "@/repositories/prisma/prismaOrganizationsRepository";
import { UpdateOrganizationService } from "../organizations/updateOrganization";

export const makeUpdateOrganizationService = () => {
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const service = new UpdateOrganizationService(prismaOrganizationsRepository);

  return service;
};
