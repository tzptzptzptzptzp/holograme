/*
  Warnings:

  - You are about to drop the column `date` on the `Memo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Memo" DROP COLUMN "date",
ADD COLUMN     "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedDate" TIMESTAMP(3);
