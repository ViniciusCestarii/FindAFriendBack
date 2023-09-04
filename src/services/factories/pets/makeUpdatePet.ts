import { PrismaOrganizationsRepository } from "@/repositories/prisma/prismaOrganizationsRepository";
import { PrismaPetsRepository } from "@/repositories/prisma/prismaPetsRepository";
import { UpdatePetService } from "@/services/pets/updatePet";

export const makeUpdatePetService = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
  const service = new UpdatePetService(
    prismaPetsRepository,
    prismaOrganizationsRepository,
  );

  return service;
};
