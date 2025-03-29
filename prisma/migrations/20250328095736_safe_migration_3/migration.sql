/*
  Warnings:

  - A unique constraint covering the columns `[responseId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Report_responseId_key" ON "Report"("responseId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE CASCADE ON UPDATE CASCADE;
