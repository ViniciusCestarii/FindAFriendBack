import { Prisma, Pet, $Enums } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import { randomUUID } from "node:crypto";
import { SearchManyPetsParams } from "@/types/petTypes";
import { InMemoryOrganizationsRepository } from "./inMemoryOrganizationsRepository";
import { getPetFase } from "@/utils/getPetFase";

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private inMemoryOrganizationsRepository: InMemoryOrganizationsRepository) {}
  public items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet : Pet = {
      id: randomUUID(),
      birthDate: new Date(data.birthDate),
      isAdopted: data.isAdopted ?? false,
      organizationId: data.organizationId,
      size: data.size as $Enums.Size,
      sex: data.sex as $Enums.Sex,
      specie: data.specie as $Enums.Specie,
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: data.description ?? null,
    }
    this.items.push(pet)

    return pet
  }
  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find(pet => pet.id === id)

    if(!pet){
      return null
    }

    return pet
  }
  async searchMany(params: SearchManyPetsParams): Promise<Pet[]> {
    const foundPets = await Promise.all(this.items.map(async pet => {
      const organization = await this.inMemoryOrganizationsRepository.findById(pet.organizationId);
    
      if (organization === null) {
        return false;
      }
    
      return (
        (!params.city || organization.city === params.city) &&
        (!params.state || organization.state === params.state) &&
        (!params.sex || pet.sex === params.sex) &&
        (!params.size || pet.size === params.size) &&
        (!params.specie || pet.specie === params.specie) &&
        (!params.fase || getPetFase({birthDate: pet.birthDate,specie: pet.specie }) === params.fase)

      );
    }));
  
    return this.items.filter((_, index) => foundPets[index]);
  }
  update(id: string, data: Prisma.PetUpdateInput): Promise<Pet | null> {
    throw new Error("Method not implemented.");
  }
}