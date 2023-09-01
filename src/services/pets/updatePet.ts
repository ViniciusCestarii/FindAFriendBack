import { PetsRepository } from "@/repositories/petsRepository"
import { Pet } from "@prisma/client"
import { ResourceNotFound } from "../errors/resourceNotFound"
import { UpdatePetType } from "@/types/petTypes"

interface UpdatePetServiceResponse {
  updatedPet: Pet
}

export class UpdatePetService {
  constructor(private petsRepository: PetsRepository) { }

  async execute({ name, birthDate, description, isAdopted, organizationId, sex, size, specie, imageUrls, id }: UpdatePetType): Promise<UpdatePetServiceResponse> {

    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFound()
    }

    const petToUpdate: UpdatePetType = {
      id,
      name,
      description,
      birthDate,
      sex,
      size,
      specie,
      isAdopted,
      organizationId,
      imageUrls
    }

    const updatedPet = await this.petsRepository.update(petToUpdate)

    return {
      updatedPet
    }
  }
}