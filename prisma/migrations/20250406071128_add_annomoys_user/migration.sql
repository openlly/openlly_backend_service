-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "anonymousUserId" TEXT;

-- CreateTable
CREATE TABLE "AnonymousUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3),
    "imageUrl" TEXT,
    "backgroundColor" TEXT,
    "metadataId" TEXT,

    CONSTRAINT "AnonymousUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnonymousUserMetadata" (
    "id" TEXT NOT NULL,
    "anonymousUserId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "deviceType" TEXT,
    "deviceModel" TEXT,
    "deviceVendor" TEXT,
    "deviceId" TEXT,
    "deviceToken" TEXT,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "timezone" TEXT,
    "isp" TEXT,
    "org" TEXT,
    "asn" TEXT,
    "asnOrg" TEXT,
    "proxy" BOOLEAN,
    "hosting" BOOLEAN,
    "mobile" BOOLEAN,

    CONSTRAINT "AnonymousUserMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousUser_username_key" ON "AnonymousUser"("username");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_anonymousUserId_fkey" FOREIGN KEY ("anonymousUserId") REFERENCES "AnonymousUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnonymousUser" ADD CONSTRAINT "AnonymousUser_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "AnonymousUserMetadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
