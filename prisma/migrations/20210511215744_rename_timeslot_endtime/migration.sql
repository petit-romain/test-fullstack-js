/*
  Warnings:

  - You are about to drop the column `endTIme` on the `Timeslot` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timeslot" DROP COLUMN "endTIme",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;
