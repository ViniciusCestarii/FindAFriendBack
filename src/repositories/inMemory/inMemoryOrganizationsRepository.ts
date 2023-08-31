import { Prisma, Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizationsRepository";
import { randomUUID } from "node:crypto";

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = []

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