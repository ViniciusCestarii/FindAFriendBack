import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetCreateInput) : Promise<Pet>
  findById(id: string) : Promise<Pet | null>
  searchManyByCity(city: string) : Promise<Pet[]>
  update(id: string, data: Prisma.PetUpdateInput) : Promise<Pet | null>
}