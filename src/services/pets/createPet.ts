import { OrganizationsRepository } from "@/repositories/organizationsRepository"
import { PetsRepository } from "@/repositories/petsRepository"
import { $Enums, Pet } from "@prisma/client"
import { ResourceNotFound } from "../errors/resourceNotFound"

interface CreatePetServiceRequest {
  name: string,
  description: string,
  birthDate: Date,
  sex: $Enums.Sex,
  size: $Enums.Size,
  specie: $Enums.Specie,
  isAdopted?: boolean,
  organizationId: string,
  imageUrls?: string[]
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository, private organizationsRepository: OrganizationsRepository) {}

  async execute({ name, birthDate, description, isAdopted, organizationId, sex, size, specie, imageUrls }: CreatePetServiceRequest) : Promise<CreatePetServiceResponse> {

    const organization = await this.organizationsRepository.findById(organizationId)

    if(!organization){
      throw new ResourceNotFound()
    }
  
    const pet = await this.petsRepository.create({
      birthDate,
      name,
      description,
      sex,
      organizationId,
      size,
      specie,
      isAdopted,
      imageUrls
    })

    return {
      pet
    }
  }
}