/*
  Warnings:

  - The required column `id` was added to the `Companies` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `companyId` to the `Patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Companies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Patients" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Patients" ADD CONSTRAINT "Patients_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
