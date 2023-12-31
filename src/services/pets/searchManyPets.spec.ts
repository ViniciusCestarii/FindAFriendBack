import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPetsRepository";
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository";
import { SearchManyPetsService } from "./searchManyPets";

// Unit test

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let sut: SearchManyPetsService;

const organizationId1 = "organizationId";
const organizationId2 = "organizationId2";

describe("Search Many Pets Service", () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    inMemoryOrganizationsRepository.create({
      organization: {
        cnpj: "123456",
        name: "Dogs Organization",
        cep: "123456",
        city: "Natal",
        email: "org.@gmail.com",
        passwordHash: "123456",
        phone: "123456",
        state: "RN",
        street: "Rua",
        id: organizationId1,
      },
    });
    inMemoryOrganizationsRepository.create({
      organization: {
        cnpj: "123456",
        name: "Dogs Organization",
        cep: "123456",
        city: "Mossoró",
        email: "org.@gmail.com",
        passwordHash: "123456",
        phone: "123456",
        state: "RN",
        street: "Rua",
        id: organizationId2,
      },
    });
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrganizationsRepository,
    );
    sut = new SearchManyPetsService(inMemoryPetsRepository);
  });

  it("should be able to search pets by its organization city", async () => {
    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: organizationId1,
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: organizationId1,
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: organizationId2,
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    const { pets } = await sut.execute({
      petSearchData: {
        size: "SMALL",
      },
      organizationSearchData: {
        city: "Natal",
      },
      page: 1,
    });

    expect(pets).toHaveLength(2);
  });

  it("should be able to search pets by its organization state", async () => {
    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: organizationId1,
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: organizationId1,
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: "i wont appear",
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: organizationId2,
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: "i wont appear",
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    const { pets } = await sut.execute({
      petSearchData: {},
      organizationSearchData: {
        state: "RN",
      },
      page: 1,
    });

    expect(pets).toHaveLength(3);
  });

  it("should be able to search pets by its characteristics", async () => {
    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date(),
        description: "description",
        organizationId: organizationId1,
        sex: "FEMALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date(),
        description: "description",
        organizationId: organizationId1,
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: "i wont appear",
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "i wont appear",
        organizationId: organizationId2,
        sex: "MALE",
        size: "SMALL",
        specie: "BIRD",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "i wont appear",
        organizationId: organizationId2,
        sex: "MALE",
        size: "MEDIUM",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    inMemoryPetsRepository.create({
      pet: {
        name: "John Doe",
        birthDate: new Date("2021-09-09"),
        description: "description",
        organizationId: "i wont appear",
        sex: "MALE",
        size: "SMALL",
        specie: "DOG",
        energyLevel: 1,
      },
    });

    const { pets } = await sut.execute({
      petSearchData: {
        fase: "BABY",
        size: "SMALL",
      },
      organizationSearchData: {},
      page: 1,
    });

    expect(pets).toHaveLength(2);
  });
});
