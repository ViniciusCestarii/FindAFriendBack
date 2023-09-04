import { OrganizationsRepository } from "@/repositories/organizationsRepository";
import { Organization } from "@prisma/client";
import { ResourceNotFound } from "../errors/resourceNotFound";

interface FetchOrganizationtionServiceResponse {
  organization: Organization;
}

export class FetchOrganizationtionService {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute(id: string): Promise<FetchOrganizationtionServiceResponse> {
    const organization = await this.organizationsRepository.findById(id);

    if (!organization) {
      throw new ResourceNotFound();
    }

    return {
      organization,
    };
  }
}
