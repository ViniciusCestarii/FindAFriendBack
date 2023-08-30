import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../usersRepository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user : User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.items.push(user)

    return user
  }
  async findByEmail(email: string) {
    const user = this.items.find(user => user.email === email)
    if(!user){
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find(user => user.id === id)

    if(!user){
      return null
    }

    return user
  }
  
}