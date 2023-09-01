import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository"
import { FetchOrganizationtionService } from "./fetchOrganization"
import { ResourceNotFound } from "../errors/resourceNotFound"

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: FetchOrganizationtionService

describe('Fetch Organization Service', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    sut = new FetchOrganizationtionService(inMemoryOrganizationsRepository)
  })

  it('should be able to fetch a organization', async () => {

    const organizationId = 'organizationId'

    inMemoryOrganizationsRepository.create({
      organization: {
      cep: '123456',
      city: 'Natal',
      email: 'org.@gmail.com',
      name: 'Dogs Organization',
      passwordHash: '123456',
      phone: '123456',
      state: 'RN',
      street: 'Rua',
      id: organizationId,
      }
    })

    const { organization } = await sut.execute(organizationId)

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to fetch a non-existing organization', async () => {

    await expect(
      sut.execute("non-existent-organization-id")
    ).rejects.toBeInstanceOf(ResourceNotFound)

  })
})