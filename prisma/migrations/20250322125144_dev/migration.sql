/*
  Warnings:

  - You are about to drop the column `questionAbrbreviation` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionAbbreviation]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionAbbreviation` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Question_questionAbrbreviation_key";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "questionAbrbreviation",
ADD COLUMN     "questionAbbreviation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fcmToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Question_questionAbbreviation_key" ON "Question"("questionAbbreviation");
