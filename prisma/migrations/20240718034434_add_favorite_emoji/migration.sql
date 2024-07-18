/*
  Warnings:

  - Added the required column `emojiId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emojiNative` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emojiUnified` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "emojiId" TEXT NOT NULL,
ADD COLUMN     "emojiNative" TEXT NOT NULL,
ADD COLUMN     "emojiUnified" TEXT NOT NULL,
ADD COLUMN     "updatedDate" TIMESTAMP(3) NOT NULL;
