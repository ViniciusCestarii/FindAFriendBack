import { PrismaPetsRepository } from "@/repositories/prisma/prismaPetsRepository";
import { DeletePetService } from "@/services/pets/deletePet";

export const makeDeletePetService = () => {
  const prismaPetsRepository = new PrismaPetsRepository();
  const service = new DeletePetService(prismaPetsRepository);

  return service;
};
