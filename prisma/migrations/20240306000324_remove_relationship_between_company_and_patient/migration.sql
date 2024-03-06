/*
  Warnings:

  - You are about to drop the column `companyId` on the `Patients` table. All the data in the column will be lost.
  - You are about to drop the `Companies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Patients" DROP CONSTRAINT "Patients_companyId_fkey";

-- AlterTable
ALTER TABLE "Patients" DROP COLUMN "companyId";

-- DropTable
DROP TABLE "Companies";
