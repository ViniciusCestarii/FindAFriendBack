import { expect, describe, it, beforeEach } from "vitest"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsersRepository"
import { RegisterUserService } from "./registerUser"
import { EmailAlreadyExistsError } from "./errors/emailAlreadyExistsError"
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository"

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterUserService

describe('Register Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUserService(inMemoryUsersRepository, inMemoryOrganizationsRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const userEmail = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email: userEmail,
      password: '123456',
    })

    await expect(() => 
      sut.execute({
        name: 'John Doe',
        email: userEmail,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)

    const organizationEmail = 'jonasDoe@gmail.com'

    await inMemoryOrganizationsRepository.create({
      name: 'ORG of love',
      email: organizationEmail,
      cep: '123456',
      city: 'Natal',
      passwordHash: '123456',
    })

    await expect(() => 
    sut.execute({
      name: 'John Doe',
      email: organizationEmail,
      password: '123456',
    })
  ).rejects.toBeInstanceOf(EmailAlreadyExistsError)

  })
})