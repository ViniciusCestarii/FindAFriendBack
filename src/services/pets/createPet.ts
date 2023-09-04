import { OrganizationsRepository } from "@/repositories/organizationsRepository";
import { PetsRepository } from "@/repositories/petsRepository";
import { Pet } from "@prisma/client";
import { ResourceNotFound } from "../errors/resourceNotFound";
import { CreatePetType } from "@/types/petTypes";

interface CreatePetServiceResponse {
  createdPet: Pet;
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    pet,
    imageUrls,
  }: CreatePetType): Promise<CreatePetServiceResponse> {
    const organization = await this.organizationsRepository.findById(
      pet.organizationId,
    );

    if (!organization) {
      throw new ResourceNotFound();
    }

    const createdPet = await this.petsRepository.create({
      pet,
      imageUrls,
    });

    return {
      createdPet,
    };
  }
}
