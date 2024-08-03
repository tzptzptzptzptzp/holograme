-- CreateTable
CREATE TABLE "Writer" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "expertise" TEXT NOT NULL,
    "targetAudience" TEXT NOT NULL,
    "sitePurpose" TEXT NOT NULL,
    "siteGenre" TEXT NOT NULL,
    "toneAndStyle" TEXT NOT NULL,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Writer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Writer" ADD CONSTRAINT "Writer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
