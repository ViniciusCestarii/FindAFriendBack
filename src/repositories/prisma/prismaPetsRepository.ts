import { prisma } from "@/lib/prisma";
import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import {
  CreatePetType,
  SearchManyPetsParams,
  UpdatePetType,
} from "@/types/petTypes";
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
      petFilters.birthDate = getPetBirthDateFilter({
        fase: searchData.fase,
        specie: searchData.specie,
      });
    }

    if (searchData.name !== undefined) {
      petFilters.name = {
        contains: searchData.name.toLocaleUpperCase(),
        mode: "insensitive",
      };
    }

    delete searchData.city;
    delete searchData.state;

    const pets = await prisma.pet.findMany({
      where: {
        ...searchData,
        organization: organizationFilters,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        organization: true,
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return pets;
  }

  async update({ imageUrls, pet }: UpdatePetType): Promise<Pet> {
    const updateImages: Prisma.ImageCreateManyPetInput[] =
      imageUrls?.map((url) => ({ url })) ?? [];

    await prisma.image.deleteMany({
      where: {
        petId: pet.id,
      },
    });

    // if i was storaging image files in a the database, i would need to delete the old ones and create the new ones

    const updatedPet = await prisma.pet.update({
      where: {
        id: pet.id,
      },
      data: {
        ...pet,
        images: {
          createMany: {
            data: updateImages,
          },
        },
      },
    });

    return updatedPet;
  }

  async create({ pet, imageUrls }: CreatePetType) {
    const createImages: Prisma.ImageCreateManyPetInput[] =
      imageUrls?.map((url) => ({ url })) ?? [];

    // if i was storaging image files in a the database, i would need to create the new images there and pick the urls

    const createdPet = await prisma.pet.create({
      data: {
        ...pet,
        birthDate: new Date(pet.birthDate),
        images: {
          createMany: {
            data: createImages,
          },
        },
      },
    });

    return createdPet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        organization: true,
      },
    });
    return pet;
  }

  async delete(id: string): Promise<void> {
    prisma.pet.delete({
      where: {
        id,
      },
    });
  }
}
