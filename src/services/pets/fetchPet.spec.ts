import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPetsRepository"
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository"
import { FetchPetService } from "./fetchPet"
import { ResourceNotFound } from "../errors/resourceNotFound"

// Unit test

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: FetchPetService

describe('Fetch Pet Service', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository(inMemoryOrganizationsRepository)
    sut = new FetchPetService(inMemoryPetsRepository)
  })

  it('should be able to fetch a pet by id', async () => {
    const petId = 'petId'

    inMemoryPetsRepository.create({
      birthDate: new Date('2021-09-09'),
      name: 'John Doe',
      organizationId: 'organizationId',
      sex:"FEMALE",
      size:"LARGE",
      specie:"REPTILE",
      id: petId,
    })

    const { pet } = await sut.execute(petId)

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to fetch a non-existent pet', async () => {
    await expect(
    sut.execute("non-existent-pet-id")
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})