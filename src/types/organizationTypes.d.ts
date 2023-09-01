import { Prisma } from '@prisma/client'

export interface UpdateOrganizationType {
  id: string
  name: string
  email: string
  password: string
  phone: string
  description: string | null
  street: string
  city: string
  state: string
  cep: string
  imageUrls: string[] | undefined
}

export interface CreateOrganizationType {
  organization: Prisma.OrganizationUncheckedCreateInput,
  imageUrls?: string[] | undefined
}