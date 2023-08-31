import { PetsRepository } from "@/repositories/petsRepository"
import { $Enums, Pet } from "@prisma/client"

interface CreatePetServiceRequest {
  name: string,
  description: string,
  birthDate: Date,
  sex: $Enums.Sex,
  size: $Enums.Size,
  specie: $Enums.Specie,
  isAdopted?: boolean,
  organizationId: string,
  imagesUrls?: string[]
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ name, birthDate, description, isAdopted, organizationId, sex, size, specie, imagesUrls }: CreatePetServiceRequest) : Promise<CreatePetServiceResponse> {
  
    const pet = await this.petsRepository.create({
      birthDate,
      name,
      description,
      sex,
      organizationId,
      size,
      specie,
      isAdopted,
      images: {
        create: imagesUrls?.map(url => ({url}))
      }
    })

    return {
      pet
    }
  }
}