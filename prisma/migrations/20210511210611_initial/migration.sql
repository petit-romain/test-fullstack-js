-- CreateEnum
CREATE TYPE "Role" AS ENUM ('UBIADMIN', 'SUPERADMIN', 'ADMIN', 'MANAGER', 'READER');

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "compoundId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationRequest" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" "Role"[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Box" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "devEUI" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "place" TEXT NOT NULL DEFAULT E'GATE',
    "storeId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

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
    "beginPlaceId" INTEGER NOT NULL,
    "endingPlaceId" INTEGER NOT NULL,

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
CREATE UNIQUE INDEX "Account.compoundId_unique" ON "Account"("compoundId");

-- CreateIndex
CREATE INDEX "providerAccountId" ON "Account"("providerAccountId");

-- CreateIndex
CREATE INDEX "providerId" ON "Account"("providerId");

-- CreateIndex
CREATE INDEX "userId" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session.sessionToken_unique" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session.accessToken_unique" ON "Session"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationRequest.token_unique" ON "VerificationRequest"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

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

-- CreateIndex
CREATE UNIQUE INDEX "RotationTime_beginPlaceId_unique" ON "RotationTime"("beginPlaceId");

-- CreateIndex
CREATE UNIQUE INDEX "RotationTime_endingPlaceId_unique" ON "RotationTime"("endingPlaceId");

-- AddForeignKey
ALTER TABLE "Gate" ADD FOREIGN KEY ("storeId") REFERENCES "Warehouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeighingArea" ADD FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quay" ADD FOREIGN KEY ("boxId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RotationTime" ADD FOREIGN KEY ("beginPlaceId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RotationTime" ADD FOREIGN KEY ("endingPlaceId") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;
