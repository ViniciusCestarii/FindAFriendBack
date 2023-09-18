import { PetsRepository } from "@/repositories/petsRepository";
import { SearchManyPetsParams, SerachManyPetsReturn } from "@/types/petTypes";

export class SearchManyPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    organizationSearchData,
    petSearchData,
    page,
    petNumber,
  }: SearchManyPetsParams): Promise<SerachManyPetsReturn> {
    const { pets, count } = await this.petsRepository.searchMany({
      organizationSearchData,
      petSearchData,
      page,
      petNumber,
    });

    return {
      pets,
      count,
    };
  }
}
