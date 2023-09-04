import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPetsRepository";
import { UpdatePetService } from "./updatePet";
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository";
import { ResourceNotFound } from "../errors/resourceNotFound";

// Unit test

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let sut: UpdatePetService;

describe("Update Pet Service", () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrganizationsRepository,
    );
    sut = new UpdatePetService(
      inMemoryPetsRepository,
      inMemoryOrganizationsRepository,
    );
  });

  it("should be able to update a pet", async () => {
    await inMemoryOrganizationsRepository.create({
      organization: {
        cep: "00000000",
        city: "city",
        email: "email",
        name: "name",
        passwordHash: "passwordHash",
        phone: "phone",
        state: "state",
        street: "street",
        createdAt: new Date(),
        description: "description",
        id: "organizationId",
      },
    });
    const pet = await inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: "organizationId",
        sex: "FEMALE",
        size: "SMALL",
        specie: "DOG",
      },
    });

    const { updatedPet } = await sut.execute({
      pet: {
        id: pet.id,
        name: "Another name",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: "organizationId",
        isAdopted: false,
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
      },
      imageUrls: undefined,
    });

    expect(updatedPet).toEqual(
      expect.objectContaining({
        name: "Another name",
        description: pet.description,
        birthDate: pet.birthDate,
        organizationId: pet.organizationId,
        sex: "MALE",
      }),
    );
  });

  it("should not be able to update a non-existent pet", async () => {
    await inMemoryOrganizationsRepository.create({
      organization: {
        cep: "00000000",
        city: "city",
        email: "email",
        name: "name",
        passwordHash: "passwordHash",
        phone: "phone",
        state: "state",
        street: "street",
        createdAt: new Date(),
        description: "description",
        id: "organizationId",
      },
    });

    await expect(
      sut.execute({
        pet: {
          id: "non-existent-id",
          name: "Another name",
          birthDate: new Date("2021-09-09"),
          description: "description",
          organizationId: "organizationId",
          isAdopted: false,
          sex: "MALE",
          size: "SMALL",
          specie: "DOG",
        },
        imageUrls: undefined,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });

  it("should not be able to update a pet to a non-existing organization", async () => {
    const pet = await inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: "organizationId",
        sex: "FEMALE",
        size: "SMALL",
        specie: "DOG",
      },
    });

    await expect(
      sut.execute({
        pet: {
          id: pet.id,
          name: "Another name",
          birthDate: new Date("2021-09-09"),
          description: "description",
          organizationId: "non-existent-organization-id",
          isAdopted: false,
          sex: "MALE",
          size: "SMALL",
          specie: "DOG",
        },
        imageUrls: undefined,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
