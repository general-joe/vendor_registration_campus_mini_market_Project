/*
  Warnings:

  - The primary key for the `BusinessInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Vendor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "BusinessInfo" DROP CONSTRAINT "BusinessInfo_vendorId_fkey";

-- AlterTable
ALTER TABLE "BusinessInfo" DROP CONSTRAINT "BusinessInfo_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "vendorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "BusinessInfo_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BusinessInfo_id_seq";

-- AlterTable
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Vendor_id_seq";

-- AddForeignKey
ALTER TABLE "BusinessInfo" ADD CONSTRAINT "BusinessInfo_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
