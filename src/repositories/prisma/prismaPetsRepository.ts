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
    const pet = await prisma.pet.create({
      data: {
        ...data,
        images: {
          create: data?.imageUrls?.map(url => ({url}))
        }
      }
    })

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
  