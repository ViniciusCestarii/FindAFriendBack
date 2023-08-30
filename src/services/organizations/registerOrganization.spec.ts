import { expect, describe, it, beforeEach } from "vitest"
import { compare } from "bcryptjs"
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository"
import { RegisterOrganizationservice } from "./registerOrganization"
import { EmailAlreadyExistsError } from "../errors/emailAlreadyExistsError"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsersRepository"

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterOrganizationservice

describe('Register Organization Service', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterOrganizationservice(inMemoryOrganizationsRepository, inMemoryUsersRepository)
  })

  it('should be able to register a organization', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cep: '123456',
      city: 'Natal',
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
    })

    await expect(() => 
      sut.execute({
        name: 'John Doe',
        email: organizationEmail,
        password: '123456',
        cep: '123456',
        city: 'Natal',
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)

    const userEmail = "jonsanDoe@gmail.com"

    inMemoryUsersRepository.create({
      name: 'John Doe',
      email: userEmail,
      passwordHash: '123456',
    })

    await expect(() => 
    sut.execute({
      name: 'John Doe',
      email: userEmail,
      password: '123456',
      cep: '123456',
      city: 'Natal',
    })
  ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})