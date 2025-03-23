/*
  Warnings:

  - You are about to drop the column `questionAbbreviation` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[questionAbrbreviation]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionAbrbreviation` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Question_questionAbbreviation_key";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "questionAbbreviation",
ADD COLUMN     "questionAbrbreviation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_questionAbrbreviation_key" ON "Question"("questionAbrbreviation");
