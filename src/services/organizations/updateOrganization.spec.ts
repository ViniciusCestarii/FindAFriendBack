import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository"
import { ResourceNotFound } from "../errors/resourceNotFound"
import { UpdateOrganizationService } from "./updateOrganization"

// Unit test

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: UpdateOrganizationService

describe('Update Organization Service', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    sut = new UpdateOrganizationService(inMemoryOrganizationsRepository)
  })

  it('should be able to update a organization', async () => {

    const organizationId = "organizationId"

    const organization = await inMemoryOrganizationsRepository.create({
      id: organizationId,
      cep: '123456',
      city: 'Natal',
      email: "teste@gmail.com",
      name: 'John Doe',
      passwordHash: '123456',
      phone: '123456',
      state: 'RN',
      street: 'Rua',
    })

    const { updatedOrganization } = await sut.execute({
      id: organization.id,
      name: 'Another name',
      description: 'description',
      cep: organization.cep,
      city: organization.city,
      email: organization.email,
      password: '123456',
      phone: organization.phone,
      street: organization.street,
      state: organization.state,
      imageUrls: undefined
    })

    expect(updatedOrganization).toEqual(expect.objectContaining({
      name: 'Another name',
      description: 'description'
    }))
  })

  it('should not be able to update a non-existent organization', async () => {
    await expect(
        sut.execute({
        id: "non-existent-id",
        name: 'Another name',
        cep: '123456',
        city: 'Natal',
        description: 'description',
        email: "asdas@gmail.com",
        password: '123456',
        phone: '123456',
        state: 'RN',
        street: 'Rua',
        imageUrls: undefined
      })).rejects.toBeInstanceOf(ResourceNotFound)
  })
})