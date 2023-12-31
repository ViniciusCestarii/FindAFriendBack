import { $Enums, Pet, Prisma } from "@prisma/client";

export type fase = "BABY" | "YOUNG" | "ADULT" | "SENIOR";

export interface SearchManyPetsParams {
  petSearchData: {
    name?: string;
    fase?: fase;
    sex?: $Enums.Sex;
    size?: $Enums.Size;
    specie?: $Enums.Specie;
    isAdopted?: boolean;
    energyLevel?: number;
  };
  organizationSearchData: {
    organizationId?: string;
    city?: string;
    state?: string;
  };
  page: number;
  petNumber: number;
}

export interface SerachManyPetsReturn {
  pets: Pet[];
  count: number;
}

export interface CreatePetType {
  pet: Prisma.PetUncheckedCreateInput;
  imageUrls?: string[] | undefined;
}

interface updatePet extends Prisma.PetUpdateInput {
  id: string;
}

export interface UpdatePetType {
  pet: updatePet;
  imageUrls: string[] | undefined;
}
