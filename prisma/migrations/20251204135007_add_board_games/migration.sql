-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateTable
CREATE TABLE "BoardGame" (
    "id" SERIAL NOT NULL,
    "bggId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "yearPublished" INTEGER,
    "gameWeight" DOUBLE PRECISION,
    "avgRating" DOUBLE PRECISION,
    "bayesAvgRating" DOUBLE PRECISION,
    "stdDev" DOUBLE PRECISION,
    "minPlayers" INTEGER,
    "maxPlayers" INTEGER,
    "comAgeRec" DOUBLE PRECISION,
    "languageEase" DOUBLE PRECISION,
    "bestPlayers" TEXT,
    "goodPlayers" TEXT,
    "numOwned" INTEGER,
    "numWant" INTEGER,
    "numWish" INTEGER,
    "numWeightVotes" INTEGER,
    "mfgPlaytime" INTEGER,
    "comMinPlaytime" INTEGER,
    "comMaxPlaytime" INTEGER,
    "mfgAgeRec" INTEGER,
    "numUserRatings" INTEGER,
    "numComments" INTEGER,
    "numAlternates" INTEGER,
    "numExpansions" INTEGER,
    "numImplementations" INTEGER,
    "isReimplementation" BOOLEAN NOT NULL DEFAULT false,
    "family" TEXT,
    "kickstarted" BOOLEAN NOT NULL DEFAULT false,
    "imagePath" TEXT,
    "rankBoardgame" INTEGER,
    "rankStrategy" INTEGER,
    "rankAbstract" INTEGER,
    "rankFamily" INTEGER,
    "rankThematic" INTEGER,
    "rankCGS" INTEGER,
    "rankWargames" INTEGER,
    "rankParty" INTEGER,
    "rankChildrens" INTEGER,
    "catThematic" BOOLEAN NOT NULL DEFAULT false,
    "catStrategy" BOOLEAN NOT NULL DEFAULT false,
    "catWar" BOOLEAN NOT NULL DEFAULT false,
    "catFamily" BOOLEAN NOT NULL DEFAULT false,
    "catCGS" BOOLEAN NOT NULL DEFAULT false,
    "catAbstract" BOOLEAN NOT NULL DEFAULT false,
    "catParty" BOOLEAN NOT NULL DEFAULT false,
    "catChildrens" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoardGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserCollection" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserCollection_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoardGame_bggId_key" ON "BoardGame"("bggId");

-- CreateIndex
CREATE INDEX "BoardGame_name_idx" ON "BoardGame" USING GIN ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "BoardGame_bggId_idx" ON "BoardGame"("bggId");

-- CreateIndex
CREATE INDEX "_UserCollection_B_index" ON "_UserCollection"("B");

-- AddForeignKey
ALTER TABLE "_UserCollection" ADD CONSTRAINT "_UserCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "BoardGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCollection" ADD CONSTRAINT "_UserCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
