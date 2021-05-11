/*
  Warnings:

  - Added the required column `storeId` to the `Gate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gate" DROP CONSTRAINT "Gate_id_fkey";

-- AlterTable
ALTER TABLE "Gate" ADD COLUMN     "storeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Gate" ADD FOREIGN KEY ("storeId") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
