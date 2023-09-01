import { PrismaPetsRepository } from "@/repositories/prisma/prismaPetsRepository"
import { SearchManyPetsService } from "../pets/searchManyPets"

export const makeSearchManyPetsService = () => {
  const prismaPetsRepository = new PrismaPetsRepository()
  const service = new SearchManyPetsService(prismaPetsRepository)
  
  return service
}