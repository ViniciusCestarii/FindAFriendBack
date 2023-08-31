import { expect, describe, it, beforeEach } from "vitest"
import { compare } from "bcryptjs"
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository"
import { RegisterOrganizationService } from "./registerOrganization"
import { EmailAlreadyExistsError } from "../errors/emailAlreadyExistsError"

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationService

describe('Register Organization Service', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationService(inMemoryOrganizationsRepository)
  })

  it('should be able to register a organization', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '123456',
      city: 'Natal',
      phone: '123456',
      state: 'RN',
      street: 'Rua',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '123456',
      city: 'Natal',
      phone: '123456',
      state: 'RN',
      street: 'Rua',
    })

    const isPasswordCorrectlyHashed = await compare('123456', organization.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a organization with same email twice', async () => {
    const organizationEmail = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email: organizationEmail,
      password: '123456',
      cep: '123456',
      city: 'Natal',
      phone: '123456',
      state: 'RN',
      street: 'Rua',
    })

    await expect(() => 
      sut.execute({
        name: 'John Doe',
        email: organizationEmail,
        password: '123456',
        cep: '123456',
        city: 'Natal',
        phone: '123456',
        state: 'RN',
        street: 'Rua',
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})