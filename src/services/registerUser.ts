import { UsersRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"
import { User } from "@prisma/client"
import { EmailAlreadyExistsError } from "./errors/emailAlreadyExistsError"
import { OrganizationsRepository } from "@/repositories/organizationsRepository"

interface RegisterUserServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserServiceResponse {
  user: User
}

export class RegisterUserService {
  constructor(private usersRepository: UsersRepository, private organizationsRepository : OrganizationsRepository) {}

  async execute({name, email, password }: RegisterUserServiceRequest) : Promise<RegisterUserServiceResponse> {
    const passwordHash = await hash(password, 6)
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(email)
  
    if (userWithSameEmail || organizationWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }
  
    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash
    })

    return {
      user
    }
  }
}