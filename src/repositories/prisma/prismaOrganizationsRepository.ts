import { prisma } from "@/lib/prisma";
import { Prisma, Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizationsRepository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data : Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email
      }
    })
    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id
      }
    })
    return organization
  }
  
}