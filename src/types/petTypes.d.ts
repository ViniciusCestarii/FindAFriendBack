import { $Enums, Prisma } from "@prisma/client"
import { Pet } from "@prisma/client"

export interface SearchManyPetsParams {
  searchData: {
  name?: string
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
  pet: Prisma.PetUncheckedCreateInput
  imageUrls?: string[] | undefined
}

export interface UpdatePetType {
  pet: {
    id: string
    birthDate: Date
    isAdopted: boolean
    description: string
    name: string
    organizationId: string
    sex:$Enums.Sex
    size: $Enums.Size
    specie: $Enums.Specie
  }
  imageUrls: string[] | undefined
}

export type fase = "BABY" | "YOUNG" | "ADULT" | "SENIOR"