/*
  Warnings:

  - You are about to drop the `Quay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TimeSlot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quay" DROP CONSTRAINT "Quay_boxId_fkey";

-- DropTable
DROP TABLE "Quay";

-- DropTable
DROP TABLE "TimeSlot";

-- CreateTable
CREATE TABLE "Timeslot" (
    "id" SERIAL NOT NULL,
    "beginTime" TIMESTAMP(3) NOT NULL,
    "endTIme" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dock" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "boxId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dock_boxId_unique" ON "Dock"("boxId");

-- AddForeignKey
ALTER TABLE "Dock" ADD FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;
