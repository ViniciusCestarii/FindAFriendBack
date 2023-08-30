/*
  Warnings:

  - You are about to drop the column `CEP` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `cep` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_organizations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone" TEXT,
    "description" TEXT,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_organizations" ("city", "created_at", "description", "email", "id", "name", "password_hash", "phone", "updated_at") SELECT "city", "created_at", "description", "email", "id", "name", "password_hash", "phone", "updated_at" FROM "organizations";
DROP TABLE "organizations";
ALTER TABLE "new_organizations" RENAME TO "organizations";
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
