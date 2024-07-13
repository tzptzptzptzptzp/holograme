/*
  Warnings:

  - You are about to drop the `StandardPhrase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "StandardPhrase";

-- CreateTable
CREATE TABLE "ChatStandardPhrase" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatStandardPhrase_pkey" PRIMARY KEY ("id")
);
