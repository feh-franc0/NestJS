/*
  Warnings:

  - Added the required column `companyId` to the `Patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patients" ADD COLUMN     "companyId" TEXT NOT NULL;
