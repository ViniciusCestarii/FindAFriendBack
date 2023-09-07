import { OrganizationsRepository } from "@/repositories/organizationsRepository";
import { Organization } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrganizationAlredyExistsError } from "../errors/organizationAlredyExistsError";

export interface RegisterOrganizationServiceRequest {
  organization: {
    id?: string | undefined;
    cnpj: string;
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

    const organizationWithSameCNPJ =
      await this.organizationsRepository.findByCnpj(organization.cnpj);

    if (organizationWithSameEmail || organizationWithSameCNPJ) {
      throw new OrganizationAlredyExistsError();
    }

    const organizationToCreate = {
      ...organization,
      password: undefined,
    };

    const createdOrganization = await this.organizationsRepository.create({
      organization: {
        ...organizationToCreate,
        passwordHash,
      },
      imageUrls,
    });

    return {
      createdOrganization,
    };
  }
}
