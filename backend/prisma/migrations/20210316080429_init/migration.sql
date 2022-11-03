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

-- CreateTable
CREATE TABLE "Pair" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PairParticipant" (
    "pairID" TEXT NOT NULL,
    "participantID" TEXT NOT NULL,

    PRIMARY KEY ("pairID","participantID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pair.name_unique" ON "Pair"("name");

-- AddForeignKey
ALTER TABLE "PairParticipant" ADD FOREIGN KEY ("pairID") REFERENCES "Pair"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PairParticipant" ADD FOREIGN KEY ("participantID") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

