/*
  Warnings:

  - Made the column `createdDate` on table `Memo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedDate` on table `Memo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Memo" ALTER COLUMN "createdDate" SET NOT NULL,
ALTER COLUMN "updatedDate" SET NOT NULL;
