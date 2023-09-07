import { PetsRepository } from "@/repositories/petsRepository";
import { Pet } from "@prisma/client";
import { ResourceNotFound } from "../errors/resourceNotFound";
import { UpdatePetType } from "@/types/petTypes";
import { OrganizationsRepository } from "@/repositories/organizationsRepository";

interface UpdatePetServiceResponse {
  updatedPet: Pet;
}

export class UpdatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    imageUrls,
    pet,
  }: UpdatePetType): Promise<UpdatePetServiceResponse> {
    const petFound = await this.petsRepository.findById(pet.id);

    if (!petFound) {
      throw new ResourceNotFound();
    }

    const updatedPet = await this.petsRepository.update({ imageUrls, pet });

    return {
      updatedPet,
    };
  }
}
