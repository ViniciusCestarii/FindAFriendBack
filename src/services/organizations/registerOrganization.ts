import { OrganizationsRepository } from "@/repositories/organizationsRepository"
import { Organization } from "@prisma/client"
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../errors/emailAlreadyExistsError"
import { CreateOrganizationType } from "@/types/organizationTypes"

export interface RegisterOrganizationServiceRequest {
  id?: string | undefined
  name: string
  email: string
  password: string
  phone: string
  description?: string | null
  street: string
  city: string
  state: string
  cep: string
  imageUrls?: string[] | undefined
}

interface RegisterOrganizationServiceResponse {
  organization: Organization
}

export class RegisterOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(data: RegisterOrganizationServiceRequest) : Promise<RegisterOrganizationServiceResponse> {
    const passwordHash = await hash(data.password, 6)
  
    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(data.email)
  
    if (organizationWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }
  
    const organization = await this.organizationsRepository.create({
      ...data,
      passwordHash
    })

    return {
      organization
    }
  }
}