import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPetsRepository";
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository";
import { ResourceNotFound } from "../errors/resourceNotFound";
import { DeletePetService } from "./deletePet";

// Unit test

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let inMemoryPetsRepository: InMemoryPetsRepository;
let sut: DeletePetService;

describe("Create Pet Service", () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrganizationsRepository,
    );
    sut = new DeletePetService(inMemoryPetsRepository);
  });

  it("should be able to delete a pet", async () => {
    inMemoryOrganizationsRepository.create({
      organization: {
        id: "organizationId",
        name: "John Doe",
        email: "teste@mail.com",
        passwordHash: "123456",
        cep: "123456",
        city: "Natal",
        phone: "123456",
        state: "RN",
        street: "Rua",
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

    await sut.execute(pet.id);

    const deletedPet = await inMemoryPetsRepository.findById(pet.id);

    expect(deletedPet).toBeNull();
  });

  it("should not be able to delete a non-existing pet", async () => {
    await expect(sut.execute("non-existing-pet-id")).rejects.toBeInstanceOf(
      ResourceNotFound,
    );
  });
});
