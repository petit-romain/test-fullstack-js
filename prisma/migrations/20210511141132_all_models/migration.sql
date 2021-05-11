-- CreateTable
CREATE TABLE "Box" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "devEUI" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeighingArea" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "boxId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trailer" (
    "id" SERIAL NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "transporter" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" SERIAL NOT NULL,
    "beginTime" TIMESTAMP(3) NOT NULL,
    "endTIme" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quay" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "boxId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RotationTime" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Padlock" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reference" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Box.devEUI_unique" ON "Box"("devEUI");

-- CreateIndex
CREATE UNIQUE INDEX "Box.serialNumber_unique" ON "Box"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "WeighingArea_boxId_unique" ON "WeighingArea"("boxId");

-- CreateIndex
CREATE UNIQUE INDEX "Trailer.licensePlate_unique" ON "Trailer"("licensePlate");

-- CreateIndex
CREATE UNIQUE INDEX "Quay_boxId_unique" ON "Quay"("boxId");

-- AddForeignKey
ALTER TABLE "WeighingArea" ADD FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quay" ADD FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;
