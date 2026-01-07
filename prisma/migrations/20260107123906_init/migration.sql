-- CreateTable
CREATE TABLE "User1" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User2" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User3" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User3_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User1_email_key" ON "User1"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User2_email_key" ON "User2"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User3_email_key" ON "User3"("email");
