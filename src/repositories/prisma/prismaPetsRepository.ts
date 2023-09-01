import { prisma } from "@/lib/prisma";
import { Prisma, Pet, $Enums } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import { CreatePetType, SearchManyPetsParams, UpdatePetType } from "@/types/petTypes";

export class PrismaPetsRepository implements PetsRepository {
  searchMany(params: SearchManyPetsParams): Promise<Pet[]> {
    throw new Error("Method not implemented.");
  }
  update(pet : UpdatePetType): Promise<Pet> {
    throw new Error("Method not implemented.");
  }
  async create(data : CreatePetType) {
    const createImages : Prisma.ImageCreateManyPetInput[] = data.imageUrls?.map(url => ({ url })) ?? []
    
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
      }
    })
    return pet
  }
}
  