import { prisma } from "@/lib/prisma";
import { Prisma, Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizationsRepository";
import { CreateOrganizationType, UpdateOrganizationType } from "@/types/organizationTypes";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  update(organization: UpdateOrganizationType): Promise<Organization> {
    throw new Error("Method not implemented.");
  }
  async create(data : CreateOrganizationType) {
    const createImages : Prisma.ImageCreateManyPetInput[] = data.imageUrls?.map(url => ({ url })) ?? []
    
    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        description: data.description,
        cep: data.cep,
        city: data.city,
        email: data.email,
        passwordHash: data.passwordHash,
        phone: data.phone,
        state: data.state,
        street: data.street,
        images: {
          createMany: {
            data: createImages,
          },
        },
      },
    });

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