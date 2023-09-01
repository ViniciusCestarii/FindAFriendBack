import { Prisma, Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizationsRepository";
import { randomUUID } from "node:crypto";
import { UpdateOrganizationType } from "@/types/organizationTypes";
import { hash } from "bcryptjs";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async update(organization: UpdateOrganizationType): Promise<Organization> {
    const organizationIndex = this.items.findIndex(item => item.id === organization.id)

    const passwordHash = await hash(organization.password, 6)

    const updatedOrganization : Organization = {
      cep: organization.cep,
      city: organization.city,
      email: organization.email,
      id: organization.id,
      name: organization.name,
      passwordHash: passwordHash,
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
  
  async create(data: Prisma.OrganizationCreateInput) {
    const organization : Organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
      cep: data.cep,
      city: data.city,
      phone: data.phone,
      state: data.state,
      street: data.street,
      description: data.description ?? null,
    }
    this.items.push(organization)

    return organization
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