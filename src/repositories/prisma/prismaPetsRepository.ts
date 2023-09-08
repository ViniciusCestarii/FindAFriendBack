import { prisma } from "@/lib/prisma";
import { Prisma, Pet } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import {
  CreatePetType,
  SearchManyPetsParams,
  SerachManyPetsReturn,
  UpdatePetType,
} from "@/types/petTypes";
import { getPetBirthDateFilter } from "@/utils/getPetBirthDateFilter";

export class PrismaPetsRepository implements PetsRepository {
  async searchMany({
    petSearchData,
    organizationSearchData,
    page,
  }: SearchManyPetsParams): Promise<SerachManyPetsReturn> {
    const petFilters: Prisma.PetWhereInput = {};

    if (
      petSearchData.fase !== undefined &&
      petSearchData.specie !== undefined
    ) {
      petFilters.birthDate = getPetBirthDateFilter({
        fase: petSearchData.fase,
        specie: petSearchData.specie,
      });
    }

    if (petSearchData.name !== undefined) {
      petFilters.name = {
        contains: petSearchData.name.toLocaleUpperCase(),
        mode: "insensitive",
      };
    }

    delete petSearchData.fase;

    const count = await prisma.pet.count({
      where: {
        ...petSearchData,
        organization: organizationSearchData,
      },
    });

    const pets = await prisma.pet.findMany({
      where: {
        ...petSearchData,
        organization: organizationSearchData,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        organization: true,
      },
      orderBy: {
        name: "asc",
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return { pets, count };
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
    const pet = await prisma.pet.findUnique({
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
    if (!pet) {
      return null;
    }
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
