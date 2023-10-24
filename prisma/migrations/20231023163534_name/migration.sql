-- DropForeignKey
ALTER TABLE "BusinessInfo" DROP CONSTRAINT "BusinessInfo_vendorId_fkey";

-- AlterTable
ALTER TABLE "BusinessInfo" ALTER COLUMN "licensed" SET DEFAULT 'No',
ALTER COLUMN "licensed" SET DATA TYPE TEXT,
ALTER COLUMN "insured" SET DEFAULT 'No',
ALTER COLUMN "insured" SET DATA TYPE TEXT,
ALTER COLUMN "vendorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BusinessInfo" ADD CONSTRAINT "BusinessInfo_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
