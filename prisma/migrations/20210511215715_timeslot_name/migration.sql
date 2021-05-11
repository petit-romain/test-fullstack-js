/*
  Warnings:

  - Added the required column `name` to the `Timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timeslot" ADD COLUMN     "name" TEXT NOT NULL;
