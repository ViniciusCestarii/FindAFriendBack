import { PrismaOrganizationsRepository } from "@/repositories/prisma/prismaOrganizationsRepository";
import { CreatePetService } from "../pets/createPet";
import { PrismaPetsRepository } from "@/repositories/prisma/prismaPetsRepository";

export const makeCreatePetService = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const service = new CreatePetService(
    prismaPetsRepository,
    prismaOrganizationsRepository,
  );

  return service;
};
