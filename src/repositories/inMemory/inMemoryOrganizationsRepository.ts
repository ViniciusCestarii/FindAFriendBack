import { Prisma, Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizationsRepository";
import { randomUUID } from "node:crypto";
import { CreateOrganizationType, UpdateOrganizationType } from "@/types/organizationTypes";
import { hash } from "bcryptjs";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async update({organization}: UpdateOrganizationType): Promise<Organization> {
    const organizationIndex = this.items.findIndex(item => item.id === organization.id)

    const updatedOrganization : Organization = {
      cep: organization.cep,
      city: organization.city,
      email: organization.email,
      id: organization.id,
      name: organization.name,
      passwordHash: this.items[organizationIndex].passwordHash,
      phone: organization.phone,
      description: organization.description,
      state: organization.state,
      street: organization.street,
      createdAt: this.items[organizationIndex].createdAt,
      updatedAt: this.items[organizationIndex].updatedAt,
    }

    this.items[organizationIndex] = updatedOrganization

    return updatedOrganization
  }
  
  async create({ organization }: CreateOrganizationType) {
    const createdOrganization : Organization = {
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
    }
    this.items.push(createdOrganization)

    return createdOrganization
  }
  async findByEmail(email: string) {
    const organization = this.items.find(organization => organization.email === email)
    if(!organization){
      return null
    }

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find(organization => organization.id === id)

    if(!organization){
      return null
    }

    return organization
  }
  
}