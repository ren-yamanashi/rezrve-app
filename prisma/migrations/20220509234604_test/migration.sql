/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Reserve` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId]` on the table `Time` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "companyId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reserve_authorId_key" ON "Reserve"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Time_authorId_key" ON "Time"("authorId");
