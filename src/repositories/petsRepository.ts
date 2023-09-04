import {
  CreatePetType,
  SearchManyPetsParams,
  UpdatePetType,
} from "@/types/petTypes";
import { Pet } from "@prisma/client";

export interface PetsRepository {
  delete(id: string): Promise<void>;
  create(data: CreatePetType): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  searchMany(params: SearchManyPetsParams): Promise<Pet[]>;
  update(pet: UpdatePetType): Promise<Pet>;
}
