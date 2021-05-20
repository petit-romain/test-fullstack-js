/*
  Warnings:

  - Made the column `firstName` on table `users` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
