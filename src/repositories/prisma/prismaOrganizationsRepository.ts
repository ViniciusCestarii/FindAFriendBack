import { prisma } from "@/lib/prisma";
import { Prisma, Organization } from "@prisma/client";
import { OrganizationsRepository } from "../organizationsRepository";
import {
  CreateOrganizationType,
  UpdateOrganizationType,
} from "@/types/organizationTypes";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async update({
    imageUrls,
    organization,
  }: UpdateOrganizationType): Promise<Organization> {
    await prisma.image.deleteMany({
      where: {
        organizationId: organization.id,
      },
    });

    // if i was storaging image files in a the database, i would need to delete the old ones and create the new ones

    const updateImages: Prisma.ImageCreateManyPetInput[] =
      imageUrls?.map((url) => ({ url })) ?? [];

    const updatedOrganization = await prisma.organization.update({
      where: {
        id: organization.id,
      },
      data: {
        ...organization,
        images: {
          createMany: {
            data: updateImages,
          },
        },
      },
    });

    return updatedOrganization;
  }

  async create({ organization, imageUrls }: CreateOrganizationType) {
    const createImages: Prisma.ImageCreateManyPetInput[] =
      imageUrls?.map((url) => ({ url })) ?? [];

    // if i was storaging image files in a the database, i would need to create the new images there and pick the urls

    const createdOrganization = await prisma.organization.create({
      data: {
        ...organization,
        images: {
          createMany: {
            data: createImages,
          },
        },
      },
    });

    return createdOrganization;
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    });
    if (!organization) {
      return null;
    }
    return organization;
  }

  async findByCnpj(cnpj: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        cnpj,
      },
    });
    if (!organization) {
      return null;
    }

    return organization;
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        pets: true,
      },
    });
    return organization;
  }
}
