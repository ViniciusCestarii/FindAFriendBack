import { Prisma } from "@prisma/client";

export interface UpdateOrganizationType {
  organization: Prisma.OrganizationUpdateInput;
  imageUrls: string[] | undefined;
}

interface updateOrganization extends Prisma.OrganizationUpdateInput {
  id: string;
}

export interface CreateOrganizationType {
  organization: Prisma.OrganizationUncheckedCreateInput;
  imageUrls?: string[] | undefined;
}
