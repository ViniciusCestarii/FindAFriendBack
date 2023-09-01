import { OrganizationsRepository } from "@/repositories/organizationsRepository"
import { Organization } from "@prisma/client"
import { ResourceNotFound } from "../errors/resourceNotFound"
import { UpdateOrganizationType } from "@/types/organizationTypes"

interface UpdateOrganizationServiceResponse {
  updatedOrganization: Organization
}

export class UpdateOrganizationService {
  constructor(private organizationsRepository: OrganizationsRepository) { }

  async execute(data : UpdateOrganizationType): Promise<UpdateOrganizationServiceResponse> {

    const organization = await this.organizationsRepository.findById(data.id)

    if (!organization) {
      throw new ResourceNotFound()
    }

    const organizationToUpdate: UpdateOrganizationType = {
      ...data
    }

    const updatedOrganization = await this.organizationsRepository.update(organizationToUpdate)

    return {
      updatedOrganization
    }
  }
}