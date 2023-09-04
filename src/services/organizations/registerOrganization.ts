import { OrganizationsRepository } from "@/repositories/organizationsRepository";
import { Organization } from "@prisma/client";
import { hash } from "bcryptjs";
import { EmailAlreadyExistsError } from "../errors/emailAlreadyExistsError";

export interface RegisterOrganizationServiceRequest {
  organization: {
    id?: string | undefined;
    name: string;
    email: string;
    password: string;
    phone: string;
    description?: string | null;
    street: string;
    city: string;
    state: string;
    cep: string;
  };
  imageUrls?: string[] | undefined;
}

interface RegisterOrganizationServiceResponse {
  createdOrganization: Organization;
}

export class RegisterOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    organization,
    imageUrls,
  }: RegisterOrganizationServiceRequest): Promise<RegisterOrganizationServiceResponse> {
    const passwordHash = await hash(organization.password, 6);

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(organization.email);

    if (organizationWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const createdOrganization = await this.organizationsRepository.create({
      organization: {
        ...organization,
        passwordHash,
      },
      imageUrls,
    });

    return {
      createdOrganization,
    };
  }
}
