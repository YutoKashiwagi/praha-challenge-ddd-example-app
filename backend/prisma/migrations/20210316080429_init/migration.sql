-- CreateTable
CREATE TABLE "SomeData" (
    "id" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "number" SMALLINT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mailAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant.mailAddress_unique" ON "Participant"("mailAddress");

