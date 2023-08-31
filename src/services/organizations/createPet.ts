import { PetsRepository } from "@/repositories/petsRepository"
import { $Enums, Pet, Prisma } from "@prisma/client"

interface CreatePetserviceRequest {
  name: string,
  description: string,
  birthDate: Date,
  sex: $Enums.Sex,
  size: $Enums.Size,
  specie: $Enums.Specie,
  isAdopted?: boolean,
  organizationId: string,
}

interface CreatePetserviceResponse {
  pet: Pet
}

export class CreatePetservice {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ name, birthDate, description, isAdopted, organizationId, sex, size, specie }: CreatePetserviceRequest) : Promise<CreatePetserviceResponse> {
  
    const pet = await this.petsRepository.create({
      birthDate,
      name,
      description,
      sex,
      organizationId,
      size,
      specie,
      isAdopted
    })

    return {
      pet
    }
  }
}