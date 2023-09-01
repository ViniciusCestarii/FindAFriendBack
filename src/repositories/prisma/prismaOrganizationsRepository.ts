import { prisma } from "@/lib/prisma";
import { Prisma, Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizationsRepository";
import { CreateOrganizationType, UpdateOrganizationType } from "@/types/organizationTypes";
import { hash } from "bcryptjs";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async update(organization: UpdateOrganizationType): Promise<Organization> {

    await prisma.image.deleteMany({
      where: {
        organizationId: organization.id,
      },
    });

    //if i was storaging image files in a the database, i would need to delete the old ones and create the new ones

    const updateImages: Prisma.ImageCreateManyPetInput[] = organization.imageUrls?.map(url => ({ url })) ?? []

    const passwordHash = await hash(organization.password, 6)

    const updatedOrganization = await prisma.organization.update({
      where: {
        id: organization.id
      },
      data: {
        name: organization.name,
        description: organization.description,
        cep: organization.cep,
        city: organization.city,
        email: organization.email,
        passwordHash,
        phone: organization.phone,
        state: organization.state,
        street: organization.street,
        images: {
          createMany: {
            data: updateImages,
          },
        },
      },
    });

    return updatedOrganization
  }
  async create(data: CreateOrganizationType) {
    const createImages: Prisma.ImageCreateManyPetInput[] = data.imageUrls?.map(url => ({ url })) ?? []

    //if i was storaging image files in a the database, i would need to create the new images there and pick the urls

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
      },
      include: {
        images: {
          select: {
            url: true
          }
        },
        pets: true,
      }
    })
    return organization
  }

}