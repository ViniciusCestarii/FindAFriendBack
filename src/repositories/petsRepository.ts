import { CreatePetType, SearchManyPetsParams, UpdatePetType } from "@/types/petTypes";
import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: CreatePetType) : Promise<Pet>
  findById(id: string) : Promise<Pet | null>
  searchMany(params: SearchManyPetsParams) : Promise<Pet[]>
  update(pet: UpdatePetType) : Promise<Pet>
}