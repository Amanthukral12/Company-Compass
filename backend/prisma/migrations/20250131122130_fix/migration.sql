/*
  Warnings:

  - Added the required column `companyId` to the `SalaryHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SalaryHistory" ADD COLUMN     "companyId" INTEGER NOT NULL;
