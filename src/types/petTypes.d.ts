import { $Enums } from "@prisma/client"

export interface SearchManyPetsParams {
  searchData: {
  city?: string
  state?: string
  fase?: fase
  sex?: $Enums.Sex
  size?: $Enums.Size
  specie?: $Enums.Specie
  isAdopted?: boolean
  },
  page: number
}

export interface CreatePetType {
  id?: string | undefined;
  name: string;
  sex: $Enums.Sex;
  description: string;
  specie: $Enums.Specie;
  size: $Enums.Size;
  birthDate: Date;
  isAdopted?: boolean;
  organizationId: string;
  imageUrls?: string[] | undefined;
}

export interface UpdatePetType {
  id: string;
  name: string;
  sex: $Enums.Sex;
  description: string;
  specie: $Enums.Specie;
  size: $Enums.Size;
  birthDate: Date;
  isAdopted: boolean;
  organizationId: string;
  imageUrls: string[] | undefined;
}

export type fase = "BABY" | "YOUNG" | "ADULT" | "SENIOR"