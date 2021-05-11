/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[beginPlaceId]` on the table `RotationTime`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[endingPlaceId]` on the table `RotationTime`. If there are existing duplicate values, the migration will fail.
  - Added the required column `beginPlaceId` to the `RotationTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endingPlaceId` to the `RotationTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RotationTime" ADD COLUMN     "beginPlaceId" INTEGER NOT NULL,
ADD COLUMN     "endingPlaceId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RotationTime_beginPlaceId_unique" ON "RotationTime"("beginPlaceId");

-- CreateIndex
CREATE UNIQUE INDEX "RotationTime_endingPlaceId_unique" ON "RotationTime"("endingPlaceId");

-- AddForeignKey
ALTER TABLE "RotationTime" ADD FOREIGN KEY ("beginPlaceId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RotationTime" ADD FOREIGN KEY ("endingPlaceId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;
