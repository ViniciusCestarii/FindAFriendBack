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

export type fase = "BABY" | "YOUNG" | "ADULT" | "SENIOR"