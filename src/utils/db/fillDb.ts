import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { randomUUID } from "node:crypto";

async function main() {
  const passwordHash = await hash("senha123", 8);

  const organizationsIds = [randomUUID(), randomUUID()];

  await prisma.organization.create({
    data: {
      id: organizationsIds[0],
      name: "Associação Amigos dos Animais de São Paulo",
      cnpj: `12.345.678/${new Date().toString()}-01`,
      email: `contato@amigosdos${new Date().toString()}animais.com`,
      passwordHash,
      phone: "(11) 1234-5678",
      description:
        "Uma organização dedicada ao bem-estar dos animais de estimação em São Paulo.",
      street: "Rua dos Pets, 123",
      city: "São Paulo",
      state: "São Paulo",
      cep: "01234-567",
    },
  });
  await prisma.organization.create({
    data: {
      id: organizationsIds[1],
      name: "Instituto de Proteção aos Animais do Rio de Janeiro",
      cnpj: `98.765.432/${new Date().toString()}-02`,
      email: `contato@protecaoanimal${new Date().toString()}.org`,
      passwordHash,
      phone: "(21) 9876-5432",
      description:
        "Uma organização dedicada à proteção dos animais de estimação no Rio de Janeiro.",
      street: "Avenida dos Pets, 456",
      city: "Rio de Janeiro",
      state: "Rio de Janeiro",
      cep: "21098-765",
    },
  });

  const imageUrl = "https://source.unsplash.com/random/?";

  await prisma.pet.create({
    data: {
      name: "John Doe",
      birthDate: new Date("2023-09-09"),
      description:
        "Meet John Doe, a happy mixed breed pet. John Doe's loving and active, seeking a forever home where he can share joy and playfulness. Ready to make your days brighter? Adopt John Doe today",
      organizationId: organizationsIds[0],
      sex: "MALE",
      size: "SMALL",
      specie: "DOG",
      energyLevel: 1,
      images: {
        create: [
          {
            url: `${imageUrl}puppy`,
          },
        ],
      },
    },
  });
  await prisma.pet.create({
    data: {
      name: "Latica",
      birthDate: new Date("2021-09-09"),
      description:
        "Meet Latica, a happy mixed breed pet. Latica's loving and active, seeking a forever home where he can share joy and playfulness. Ready to make your days brighter? Adopt Latica today",
      organizationId: organizationsIds[0],
      sex: "FEMALE",
      size: "SMALL",
      specie: "CAT",
      energyLevel: 2,
      images: {
        create: [
          {
            url: `${imageUrl}cat`,
          },
        ],
      },
    },
  });
  await prisma.pet.create({
    data: {
      name: "George",
      birthDate: new Date("2021-09-09"),
      description:
        "Meet George, a happy mixed breed pet. George's loving and active, seeking a forever home where he can share joy and playfulness. Ready to make your days brighter? Adopt George today",
      organizationId: organizationsIds[0],
      sex: "MALE",
      size: "MEDIUM",
      specie: "DOG",
      energyLevel: 4,
      images: {
        create: [
          {
            url: `${imageUrl}dog`,
          },
        ],
      },
    },
  });
  await prisma.pet.create({
    data: {
      name: "Ricardio",
      birthDate: new Date("2021-09-09"),
      description:
        "Meet Ricardio, a happy mixed breed pet. Ricardio's loving and active, seeking a forever home where he can share joy and playfulness. Ready to make your days brighter? Adopt Ricardio today",
      organizationId: organizationsIds[0],
      sex: "MALE",
      size: "LARGE",
      specie: "REPTILE",
      energyLevel: 3,
      images: {
        create: [
          {
            url: `${imageUrl}reptile`,
          },
        ],
      },
    },
  });
  await prisma.pet.create({
    data: {
      name: "Natasha",
      birthDate: new Date("2021-09-09"),
      description:
        "Meet Natasha, a happy mixed breed pet. Natasha's loving and active, seeking a forever home where he can share joy and playfulness. Ready to make your days brighter? Adopt Natasha today",
      organizationId: organizationsIds[0],
      sex: "FEMALE",
      size: "SMALL",
      specie: "BIRD",
      energyLevel: 4,
      images: {
        create: [
          {
            url: `${imageUrl}bird`,
          },
        ],
      },
    },
  });

  await prisma.pet.create({
    data: {
      name: "Carlos",
      birthDate: new Date("2021-09-09"),
      description:
        "Meet Carlos, a happy mixed breed pet. Carlos's loving and active, seeking a forever home where he can share joy and playfulness. Ready to make your days brighter? Adopt Carlos today",
      organizationId: organizationsIds[0],
      sex: "MALE",
      size: "SMALL",
      specie: "RODENT",
      energyLevel: 4,
      images: {
        create: [
          {
            url: `${imageUrl}rodent`,
          },
        ],
      },
    },
  });

  await prisma.pet.create({
    data: {
      name: "Nemo",
      birthDate: new Date("2021-09-09"),
      description:
        "Meet Nemo, a happy mixed breed pet. Nemo's loving and active, seeking a forever home where he can share joy and playfulness. Ready to make your days brighter? Adopt Nemo today",
      organizationId: organizationsIds[0],
      sex: "MALE",
      size: "SMALL",
      specie: "FISH",
      energyLevel: 4,
      images: {
        create: [
          {
            url: `${imageUrl}fish`,
          },
        ],
      },
    },
  });

  await prisma.pet.create({
    data: {
      name: "The Unknown",
      birthDate: new Date("2021-09-09"),
      description:
        "Meet The Unknown, a happy mixed breed pet. The Unknown's loving and active, seeking a forever home where he can share joy and playfulness. Ready to make your days brighter? Adopt The Unknown today",
      organizationId: organizationsIds[0],
      sex: "MALE",
      size: "SMALL",
      specie: "OTHER",
      energyLevel: 4,
      images: {
        create: [
          {
            url: `${imageUrl}dark`,
          },
        ],
      },
    },
  });

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
