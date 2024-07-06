/*
  Warnings:

  - Made the column `order` on table `Favorite` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Favorite" ALTER COLUMN "order" SET NOT NULL;
