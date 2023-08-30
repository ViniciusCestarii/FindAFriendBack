import { expect, describe, it, beforeEach } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/inMemory/inMemoryUsersRepository"
import { AuthenticateUserService } from "./authenticateUser"
import { InvalidCredentialsError } from "../errors/invalidCredentialsError"

// Unit test

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUserService

describe('Authenticate User Service', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserService(inMemoryUsersRepository)
  })

  it('should be able to authenticate', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(async () => await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    expect(async () => await sut.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})