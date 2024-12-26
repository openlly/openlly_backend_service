-- CreateTable
CREATE TABLE "Username" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "Username_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Username_username_key" ON "Username"("username");
