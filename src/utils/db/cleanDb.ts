import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.$executeRaw`DELETE FROM organizations`;

  await prisma.$executeRaw`DELETE FROM pets`;

  await prisma.$executeRaw`DELETE FROM images`;

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
