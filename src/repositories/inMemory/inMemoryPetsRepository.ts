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
    const { petSearchData, organizationSearchData, page } = params;
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
          (petSearchData.isAdopted
            ? pet.isAdopted === petSearchData.isAdopted
            : pet.isAdopted === false) &&
          (!organizationSearchData.city ||
            organization.city === organizationSearchData.city) &&
          (!organizationSearchData.state ||
            organization.state === organizationSearchData.state) &&
          (!petSearchData.sex || pet.sex === petSearchData.sex) &&
          (!petSearchData.size || pet.size === petSearchData.size) &&
          (!petSearchData.specie || pet.specie === petSearchData.specie) &&
          (!petSearchData.fase ||
            getPetFase({ birthDate: pet.birthDate, specie: pet.specie }) ===
              petSearchData.fase)
        );
      }),
    );

    return this.items
      .filter((_, index) => foundPets[index])
      .slice((page - 1) * 20, page * 20);
  }

  async update({ pet }: UpdatePetType): Promise<Pet> {
    const petIndex = this.items.findIndex((item) => item.id === pet.id);

    const oldPet = this.items[petIndex];

    const updatedPet: Pet = {
      birthDate: pet.birthDate
        ? new Date(pet.birthDate.toString())
        : oldPet.birthDate,
      isAdopted: Boolean(pet.isAdopted) ?? oldPet.isAdopted,
      size: (pet.size as $Enums.Size) ?? oldPet.size,
      sex: (pet.sex as $Enums.Sex) ?? oldPet.sex,
      specie: (pet.specie as $Enums.Specie) ?? oldPet.specie,
      createdAt: oldPet.createdAt,
      description: pet.description?.toString() ?? oldPet.description,
      name: pet.name?.toString() ?? oldPet.name,
      id: oldPet.id,
      organizationId: oldPet.organizationId,
      updatedAt: oldPet.updatedAt,
    };

    this.items[petIndex] = updatedPet;

    return updatedPet;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
