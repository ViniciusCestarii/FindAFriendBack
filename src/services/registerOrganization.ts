import { OrganizationsRepository } from "@/repositories/organizationsRepository"
import { Organization } from "@prisma/client"
import { hash } from "bcryptjs"
import { EmailAlreadyExistsError } from "./errors/emailAlreadyExistsError"
import { UsersRepository } from "@/repositories/usersRepository"

interface RegisterOrganizationserviceRequest {
  name: string
  email: string
  password: string
  cep: string,
  city: string,
}

interface RegisterOrganizationserviceResponse {
  organization: Organization
}

export class RegisterOrganizationservice {
  constructor(private organizationsRepository: OrganizationsRepository, private usersRepository: UsersRepository) {}

  async execute({name, email, password, cep, city }: RegisterOrganizationserviceRequest) : Promise<RegisterOrganizationserviceResponse> {
    const passwordHash = await hash(password, 6)
  
    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(email)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
  
    if (organizationWithSameEmail || userWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }
  
    const organization = await this.organizationsRepository.create({
      name,
      email,
      passwordHash,
      cep,
      city,
    })

    return {
      organization
    }
  }
}