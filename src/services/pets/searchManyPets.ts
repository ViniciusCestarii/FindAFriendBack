import { PetsRepository } from "@/repositories/petsRepository"
import { SearchManyPetsParams } from "@/types/petTypes"
import { Pet } from "@prisma/client"

interface SearchManyPetsServiceResponse {
  pets: Pet[]
}

export class SearchManyPetsService {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ searchData, page }: SearchManyPetsParams): Promise<SearchManyPetsServiceResponse> {

    const pets = await this.petsRepository.searchMany({
      searchData,
      page
    })

    return {
      pets
    }
  }
}