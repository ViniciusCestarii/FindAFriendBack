import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository"
import { InvalidCredentialsError } from "../errors/invalidCredentialsError"
import { AuthenticateOrganizationService } from "./authenticateOrganization"

// Unit test

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrganizationService

describe('Authenticate Organization Service', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationService(inMemoryOrganizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryOrganizationsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      cep: '123456',
      city: 'Natal',
    })

    const { organization } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(async () => await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryOrganizationsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
      cep: '123456',
      city: 'Natal',
    })

    expect(async () => await sut.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})