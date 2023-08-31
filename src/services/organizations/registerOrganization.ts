import { OrganizationsRepository } from "@/repositories/organizationsRepository"
import { Organization, Prisma } from "@prisma/client"
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../errors/emailAlreadyExistsError"

interface RegisterOrganizationserviceRequest {
  name: string
  email: string
  password: string
  cep: string
  city: string
  phone: string
  state: string
  street: string
  description?: string
}

interface RegisterOrganizationserviceResponse {
  organization: Organization
}

export class RegisterOrganizationservice {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ name, cep, city, email, password, phone, state, street, description }: RegisterOrganizationserviceRequest) : Promise<RegisterOrganizationserviceResponse> {
    const passwordHash = await hash(password, 6)
  
    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(email)
  
    if (organizationWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }
  
    const organization = await this.organizationsRepository.create({
      cep,
      city,
      email,
      name,
      phone,
      state,
      street,
      passwordHash
    })

    return {
      organization
    }
  }
}