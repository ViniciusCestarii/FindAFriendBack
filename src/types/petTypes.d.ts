import { $Enums } from "@prisma/client"

export interface SearchManyPetsParams {
  city?: string
  state?: string
  fase?: fase
  sex?: $Enums.Sex
  size?: $Enums.Size
  specie?: $Enums.Specie
}

export type fase = "BABY" | "YOUNG" | "ADULT" | "SENIOR"