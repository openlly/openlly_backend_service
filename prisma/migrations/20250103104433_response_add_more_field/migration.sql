-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "ackEmail" TEXT,
ADD COLUMN     "ackSentAt" TIMESTAMP(3),
ADD COLUMN     "hint" TEXT,
ADD COLUMN     "selectedTime" TIMESTAMP(3),
ADD COLUMN     "sendIdentity" TEXT;
