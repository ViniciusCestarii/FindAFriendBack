import { CreateOrganizationType, UpdateOrganizationType } from "@/types/organizationTypes";
import { Organization } from "@prisma/client";

export interface OrganizationsRepository {
  create(data: CreateOrganizationType) : Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string) : Promise<Organization | null>
  update(organization: UpdateOrganizationType) : Promise<Organization>
}