import { Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizationsRepository";
import { randomUUID } from "node:crypto";
import {
  CreateOrganizationType,
  UpdateOrganizationType,
} from "@/types/organizationTypes";

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = [];

  async update({
    organization,
  }: UpdateOrganizationType): Promise<Organization> {
    const organizationIndex = this.items.findIndex(
      (item) => item.id === organization.id,
    );

    const oldOrganization = this.items[organizationIndex];

    const updatedOrganization: Organization = {
      cnpj: oldOrganization.cnpj,
      cep: organization.cep?.toString() ?? oldOrganization.cep,
      city: organization.city?.toString() ?? oldOrganization.city,
      email: organization.email?.toString() ?? oldOrganization.email,
      id: organization.id,
      name: organization.name?.toString() ?? oldOrganization.name,
      passwordHash: oldOrganization.passwordHash,
      phone: organization.phone?.toString() ?? oldOrganization.phone,
      description:
        organization.description?.toString() ?? oldOrganization.description,
      state: organization.state?.toString() ?? oldOrganization.state,
      street: organization.street?.toString() ?? oldOrganization.street,
      createdAt: oldOrganization.createdAt,
      updatedAt: oldOrganization.updatedAt,
    };

    this.items[organizationIndex] = updatedOrganization;

    return updatedOrganization;
  }

  async create({ organization }: CreateOrganizationType) {
    const createdOrganization: Organization = {
      cnpj: organization.cnpj,
      id: organization.id ?? randomUUID(),
      name: organization.name,
      email: organization.email,
      passwordHash: organization.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      cep: organization.cep,
      city: organization.city,
      phone: organization.phone,
      state: organization.state,
      street: organization.street,
      description: organization.description ?? null,
    };
    this.items.push(createdOrganization);

    return createdOrganization;
  }

  async findByEmail(email: string) {
    const organization = this.items.find(
      (organization) => organization.email === email,
    );
    if (!organization) {
      return null;
    }

    return organization;
  }

  async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = this.items.find(
      (organization) => organization.cnpj === cnpj,
    );
    if (!organization) {
      return null;
    }

    return organization;
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find(
      (organization) => organization.id === id,
    );

    if (!organization) {
      return null;
    }

    return organization;
  }
}
