import { OrganizationsRepository } from "@/repositories/organizationsRepository"
import { Organization } from "@prisma/client"
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "../errors/emailAlreadyExistsError"

interface RegisterOrganizationServiceRequest {
  name: string
  email: string
  password: string
  cep: string
  city: string
  phone: string
  state: string
  street: string
  description?: string
  imageUrls?: string[]
}

interface RegisterOrganizationServiceResponse {
  organization: Organization
}

export class RegisterOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ name, cep, city, email, password, phone, state, street, description, imageUrls }: RegisterOrganizationServiceRequest) : Promise<RegisterOrganizationServiceResponse> {
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
      passwordHash,
      description,
      images:{
        create: imageUrls?.map(url => ({url}))
      }
    })

    return {
      organization
    }
  }
}