/*
  Warnings:

  - You are about to drop the column `place` on the `Gate` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[boxId]` on the table `Gate`. If there are existing duplicate values, the migration will fail.
  - Added the required column `boxId` to the `Gate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gate" DROP COLUMN "place",
ADD COLUMN     "boxId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Gate_boxId_unique" ON "Gate"("boxId");

-- AddForeignKey
ALTER TABLE "Gate" ADD FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;
