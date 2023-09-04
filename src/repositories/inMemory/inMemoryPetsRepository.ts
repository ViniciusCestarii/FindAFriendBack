import { Pet, $Enums } from "@prisma/client";
import { PetsRepository } from "../petsRepository";
import { randomUUID } from "node:crypto";
import {
  CreatePetType,
  SearchManyPetsParams,
  UpdatePetType,
} from "@/types/petTypes";
import { InMemoryOrganizationsRepository } from "./inMemoryOrganizationsRepository";
import { getPetFase } from "@/utils/getPetFase";

export class InMemoryPetsRepository implements PetsRepository {
  constructor(
    private inMemoryOrganizationsRepository: InMemoryOrganizationsRepository,
  ) {}

  public items: Pet[] = [];
  async create({ pet }: CreatePetType) {
    const createdPet: Pet = {
      id: pet.id ?? randomUUID(),
      birthDate: new Date(pet.birthDate),
      isAdopted: pet.isAdopted ?? false,
      organizationId: pet.organizationId,
      size: pet.size as $Enums.Size,
      sex: pet.sex as $Enums.Sex,
      specie: pet.specie as $Enums.Specie,
      name: pet.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: pet.description ?? null,
    };

    this.items.push(createdPet);

    return createdPet;
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async searchMany(params: SearchManyPetsParams): Promise<Pet[]> {
    const { searchData, page } = params;
    const foundPets = await Promise.all(
      this.items.map(async (pet) => {
        const organization =
          await this.inMemoryOrganizationsRepository.findById(
            pet.organizationId,
          );

        if (organization === null) {
          return false;
        }

        return (
          (searchData.isAdopted
            ? pet.isAdopted === searchData.isAdopted
            : !pet.isAdopted) &&
          (!searchData.city || organization.city === searchData.city) &&
          (!searchData.state || organization.state === searchData.state) &&
          (!searchData.sex || pet.sex === searchData.sex) &&
          (!searchData.size || pet.size === searchData.size) &&
          (!searchData.specie || pet.specie === searchData.specie) &&
          (!searchData.fase ||
            getPetFase({ birthDate: pet.birthDate, specie: pet.specie }) ===
              searchData.fase)
        );
      }),
    );

    return this.items
      .filter((_, index) => foundPets[index])
      .slice((page - 1) * 20, page * 20);
  }

  async update({ pet }: UpdatePetType): Promise<Pet> {
    const petIndex = this.items.findIndex((item) => item.id === pet.id);

    const updatedPet: Pet = {
      birthDate: pet.birthDate,
      isAdopted: pet.isAdopted,
      organizationId: pet.organizationId,
      size: pet.size,
      sex: pet.sex,
      specie: pet.specie,
      createdAt: this.items[petIndex].createdAt,
      description: pet.description,
      name: pet.name,
      id: pet.id,
      updatedAt: this.items[petIndex].updatedAt,
    };

    this.items[petIndex] = updatedPet;

    return updatedPet;
  }
}
