import { Prisma } from "@prisma/client";

export interface UpdateOrganizationType {
  organization: {
    id: string;
    name: string;
    email: string;
    phone: string;
    description: string | null;
    street: string;
    city: string;
    state: string;
    cep: string;
  };
  imageUrls: string[] | undefined;
}

export interface CreateOrganizationType {
  organization: Prisma.OrganizationUncheckedCreateInput;
  imageUrls?: string[] | undefined;
}
