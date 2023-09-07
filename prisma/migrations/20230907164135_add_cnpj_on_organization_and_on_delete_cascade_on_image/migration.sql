/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_petId_fkey";

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "cnpj" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_cnpj_key" ON "organizations"("cnpj");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
