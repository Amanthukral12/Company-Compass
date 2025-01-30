/*
  Warnings:

  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_email_companyId_idx";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "email",
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Employee_companyId_idx" ON "Employee"("companyId");
