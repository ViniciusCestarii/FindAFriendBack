/*
  Warnings:

  - You are about to drop the column `age` on the `pets` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "age",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "Age";
