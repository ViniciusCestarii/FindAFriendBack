import { OrganizationsRepository } from "@/repositories/organizationsRepository";
import { InvalidCredentialsError } from "../errors/invalidCredentialsError";
import { compare } from "bcryptjs";
import { Organization } from "@prisma/client";

interface AuthenticateOrganizationServiceRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationServiceResponse {
  organization: Organization
}

export class AuthenticateOrganizationService {
  constructor(
    private organizationsRepository: OrganizationsRepository
  ) {}

  async execute({email, password}: AuthenticateOrganizationServiceRequest): Promise<AuthenticateOrganizationServiceResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if(!organization){
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, organization.passwordHash)

    if(!doesPasswordMatches){
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}