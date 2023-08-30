import { UsersRepository } from "@/repositories/usersRepository";
import { InvalidCredentialsError } from "../errors/invalidCredentialsError";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUserServiceRequest {
  email: string
  password: string
}

interface AuthenticateUserServiceResponse {
  user: User
}

export class AuthenticateUserService {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({email, password}: AuthenticateUserServiceRequest): Promise<AuthenticateUserServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if(!user){
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.passwordHash)

    if(!doesPasswordMatches){
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}