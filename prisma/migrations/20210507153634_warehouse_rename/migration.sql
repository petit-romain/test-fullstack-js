/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gate" DROP CONSTRAINT "Gate_id_fkey";

-- DropTable
DROP TABLE "Store";

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gate" ADD FOREIGN KEY ("id") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;
