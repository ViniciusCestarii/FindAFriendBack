import { PrismaPetsRepository } from "@/repositories/prisma/prismaPetsRepository";
import { FetchPetService } from "@/services/pets/fetchPet";

export const makeFetchPetService = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new FetchPetService(prismaPetsRepository);

  return service;
};
