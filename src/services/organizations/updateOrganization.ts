import { OrganizationsRepository } from "@/repositories/organizationsRepository";
import { Organization } from "@prisma/client";
import { ResourceNotFound } from "../errors/resourceNotFound";
import { UpdateOrganizationType } from "@/types/organizationTypes";

interface UpdateOrganizationServiceResponse {
  updatedOrganization: Organization;
}

export class UpdateOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    imageUrls,
    organization,
  }: UpdateOrganizationType): Promise<UpdateOrganizationServiceResponse> {
    const foundOrganization = await this.organizationsRepository.findById(
      organization.id,
    );

    if (!foundOrganization) {
      throw new ResourceNotFound();
    }

    const organizationToUpdate: UpdateOrganizationType = {
      organization,
      imageUrls,
    };

    const updatedOrganization =
      await this.organizationsRepository.update(organizationToUpdate);

    return {
      updatedOrganization,
    };
  }
}
