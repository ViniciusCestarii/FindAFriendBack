import { PetsRepository } from "@/repositories/petsRepository"
import { Pet } from "@prisma/client"
import { ResourceNotFound } from "../errors/resourceNotFound"

interface FetchPetServiceResponse {
  pet: Pet
}

export class FetchPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute(id: string) : Promise<FetchPetServiceResponse> {
  
    const pet = await this.petsRepository.findById(id)
console.log(pet)
    if(!pet){
      throw new ResourceNotFound()
    }

    return {
      pet
    }
  }
}