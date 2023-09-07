import { Prisma } from "@prisma/client";

interface updateOrganization extends Prisma.OrganizationUpdateInput {
  id: string;
}

export interface UpdateOrganizationType {
  organization: updateOrganization;
  imageUrls: string[] | undefined;
}

export interface CreateOrganizationType {
  organization: Prisma.OrganizationUncheckedCreateInput;
  imageUrls?: string[] | undefined;
}
