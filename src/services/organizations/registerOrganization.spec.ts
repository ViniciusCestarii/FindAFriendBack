import { expect, describe, it, beforeEach } from "vitest";
import { compare } from "bcryptjs";
import { InMemoryOrganizationsRepository } from "@/repositories/inMemory/inMemoryOrganizationsRepository";
import { RegisterOrganizationService } from "./registerOrganization";
import { OrganizationAlredyExistsError } from "../errors/organizationAlredyExistsError";

let inMemoryOrganizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterOrganizationService;

describe("Register Organization Service", () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationsRepository();
    sut = new RegisterOrganizationService(inMemoryOrganizationsRepository);
  });

  it("should be able to register a organization", async () => {
    const { createdOrganization } = await sut.execute({
      organization: {
        cnpj: "48.390.507/0001-25",
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
        cep: "123456",
        city: "Natal",
        phone: "123456",
        state: "RN",
        street: "Rua",
      },
    });

    expect(createdOrganization.id).toEqual(expect.any(String));
  });

  it("should hash organization password upon registration", async () => {
    const { createdOrganization } = await sut.execute({
      organization: {
        cnpj: "48.390.507/0001-25",
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
        cep: "123456",
        city: "Natal",
        phone: "123456",
        state: "RN",
        street: "Rua",
      },
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      createdOrganization.passwordHash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register a organization with same email", async () => {
    const organizationEmail = "johndoe@example.com";

    await sut.execute({
      organization: {
        cnpj: "48.390.507/0001-25",
        name: "John Doe",
        email: organizationEmail,
        password: "123456",
        cep: "123456",
        city: "Natal",
        phone: "123456",
        state: "RN",
        street: "Rua",
      },
    });

    await expect(() =>
      sut.execute({
        organization: {
          cnpj: "48.390.507/0001-25",
          name: "John Doe",
          email: organizationEmail,
          password: "123456",
          cep: "123456",
          city: "Natal",
          phone: "123456",
          state: "RN",
          street: "Rua",
        },
      }),
    ).rejects.toBeInstanceOf(OrganizationAlredyExistsError);
  });

  it("should not be able to register a organization with same cnpj", async () => {
    const organizationCnpj = "48.390.507/0001-25";

    await sut.execute({
      organization: {
        cnpj: organizationCnpj,
        name: "John Doe",
        email: "test@gmail.com",
        password: "123456",
        cep: "123456",
        city: "Natal",
        phone: "123456",
        state: "RN",
        street: "Rua",
      },
    });

    await expect(() =>
      sut.execute({
        organization: {
          cnpj: organizationCnpj,
          name: "John Doe",
          email: "superTest@gmail.com",
          password: "123456",
          cep: "123456",
          city: "Natal",
          phone: "123456",
          state: "RN",
          street: "Rua",
        },
      }),
    ).rejects.toBeInstanceOf(OrganizationAlredyExistsError);
  });
});
