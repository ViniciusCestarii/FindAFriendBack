import { PetsRepository } from "@/repositories/petsRepository"
import { Pet } from "@prisma/client"
import { ResourceNotFound } from "../errors/resourceNotFound"
import { UpdatePetType } from "@/types/petTypes"

interface UpdatePetServiceResponse {
  updatedPet: Pet
}

export class UpdatePetService {
  constructor(private petsRepository: PetsRepository) { }

  async execute(data: UpdatePetType): Promise<UpdatePetServiceResponse> {

    const pet = await this.petsRepository.findById(data.id)

    if (!pet) {
      throw new ResourceNotFound()
    }

    const petToUpdate: UpdatePetType = {
      ...data
    }

    const updatedPet = await this.petsRepository.update(petToUpdate)

    return {
      updatedPet
    }
  }
}