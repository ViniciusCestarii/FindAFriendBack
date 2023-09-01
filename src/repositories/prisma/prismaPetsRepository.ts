import { prisma } from "@/lib/prisma";
import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import { CreatePetType, SearchManyPetsParams, UpdatePetType } from "@/types/petTypes";
import { getPetBirthDateFilter } from "@/utils/getPetBirthDateFilter";

export class PrismaPetsRepository implements PetsRepository {
  async searchMany({ searchData, page }: SearchManyPetsParams): Promise<Pet[]> {
    const petFilters: Prisma.PetWhereInput = {};
    const organizationFilters: Prisma.OrganizationWhereInput = {};

    if (searchData.city !== undefined) {
      organizationFilters.city = searchData.city;
    }

    if (searchData.state !== undefined) {
      organizationFilters.state = searchData.state;
    }

    if (searchData.fase !== undefined && searchData.specie !== undefined) {
      petFilters.birthDate = getPetBirthDateFilter({ fase: searchData.fase, specie: searchData.specie })
    }

    if (searchData.name !== undefined) {
      petFilters.name = {
        contains: searchData.name.toLocaleUpperCase(),
        mode: 'insensitive'
      }
    }

    if (searchData.sex !== undefined) {
      petFilters.sex = searchData.sex;
    }

    if (searchData.size !== undefined) {
      petFilters.size = searchData.size;
    }

    if (searchData.specie !== undefined) {
      petFilters.specie = searchData.specie;
    }

    if (searchData.isAdopted !== undefined) {
      petFilters.isAdopted = searchData.isAdopted;
    }

    const pets = await prisma.pet.findMany({
      where:
      {
        ...petFilters,
        organization: organizationFilters,
      },
      include: {
        images: {
          select: {
            url: true,
          }
        },
        organization: true,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return pets;
  }

  async update(pet: UpdatePetType): Promise<Pet> {
    const updateImages: Prisma.ImageCreateManyPetInput[] = pet.imageUrls?.map(url => ({ url })) ?? []

    await prisma.image.deleteMany({
      where: {
        petId: pet.id,
      },
    });

    //if i was storaging image files in a the database, i would need to delete the old ones and create the new ones

    const updatedPet = await prisma.pet.update({
      where: {
        id: pet.id
      },
      data: {
        name: pet.name,
        description: pet.description,
        birthDate: new Date(pet.birthDate),
        sex: pet.sex,
        size: pet.size,
        specie: pet.specie,
        isAdopted: pet.isAdopted,
        organizationId: pet.organizationId,
        images: {
          createMany: {
            data: updateImages,
          },
        },
      },
    });

    return updatedPet
  }
  async create(data: CreatePetType) {
    const createImages: Prisma.ImageCreateManyPetInput[] = data.imageUrls?.map(url => ({ url })) ?? []

    //if i was storaging image files in a the database, i would need to create the new images there and pick the urls

    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        description: data.description,
        birthDate: new Date(data.birthDate),
        sex: data.sex,
        size: data.size,
        specie: data.specie,
        isAdopted: data.isAdopted,
        organizationId: data.organizationId,
        images: {
          createMany: {
            data: createImages,
          },
        },
      },
    });

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      },
      include: {
        images: {
          select: {
            url: true,
          }
        },
        organization: true,
      }
    })
    return pet
  }
}
