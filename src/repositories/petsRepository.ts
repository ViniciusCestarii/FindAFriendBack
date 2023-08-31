import { SearchManyPetsParams } from "@/types/petTypes";
import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput) : Promise<Pet>
  findById(id: string) : Promise<Pet | null>
  searchMany(params: SearchManyPetsParams) : Promise<Pet[]>
  update(id: string, data: Prisma.PetUpdateInput) : Promise<Pet | null>
}