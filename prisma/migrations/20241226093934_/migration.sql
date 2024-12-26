/*
  Warnings:

  - You are about to drop the `UserAvatar` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[questionAbrbreviation]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `questionAbrbreviation` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "questionAbrbreviation" TEXT NOT NULL;

-- DropTable
DROP TABLE "UserAvatar";

-- CreateIndex
CREATE UNIQUE INDEX "Question_questionAbrbreviation_key" ON "Question"("questionAbrbreviation");
