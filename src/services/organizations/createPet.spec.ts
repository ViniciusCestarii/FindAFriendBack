import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPetsRepository"
import { CreatePetservice } from "./createPet"
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository"

// Unit test

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: CreatePetservice

describe('Create Pet Service', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryOrganizationsRepository)
    sut = new CreatePetservice(inMemoryPetsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'John Doe',
      birthDate: new Date('2021-09-09'),
      description: 'description',
      organizationId: 'organizationId',
      sex:"FEMALE",
      size:"SMALL",
      specie:"DOG",
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})