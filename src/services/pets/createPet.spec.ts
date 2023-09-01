import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryPetsRepository } from "@/repositories/inMemory/inMemoryPetsRepository"
import { CreatePetService } from "./createPet"
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository"
import { ResourceNotFound } from "../errors/resourceNotFound"

// Unit test

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: CreatePetService

describe('Create Pet Service', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository
    (inMemoryOrganizationsRepository)
    sut = new CreatePetService(inMemoryPetsRepository, inMemoryOrganizationsRepository)
  })

  it('should be able to create a pet', async () => {
    inMemoryOrganizationsRepository.create({
      id: 'organizationId',
      name: 'John Doe',
      email: "teste@mail.com",
      passwordHash: '123456',
      cep: '123456',
      city: 'Natal',
      phone: '123456',
      state: 'RN',
      street: 'Rua',
    })

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

  it('should be not able to create a pet in a non-existing organization', async () => {
    await expect( sut.execute({
      name: 'John Doe',
      birthDate: new Date('2021-09-09'),
      description: 'description',
      organizationId: 'organizationId',
      sex:"FEMALE",
      size:"SMALL",
      specie:"DOG",
    })).rejects.toBeInstanceOf(ResourceNotFound)
  })
})