-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
