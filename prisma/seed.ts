import fs from "node:fs";
import csv from "csv-parser";
import { BoardGameCreateManyInput } from "../generated/prisma/models";
import { prisma } from "@/app/lib/prisma/prisma";

async function main() {
  const games: BoardGameCreateManyInput[] = [];

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream("prisma/games.csv")
      .pipe(csv())
      .on("data", (row) => {
        games.push({
          bggId: Number.parseInt(row.BGGId),
          name: row.Name,
          description: row.Description,
          yearPublished: row.YearPublished
            ? Number.parseInt(row.YearPublished)
            : undefined,
          gameWeight: row.GameWeight
            ? Number.parseFloat(row.GameWeight)
            : undefined,
          avgRating: row.AvgRating
            ? Number.parseFloat(row.AvgRating)
            : undefined,
          bayesAvgRating: row.BayesAvgRating
            ? Number.parseFloat(row.BayesAvgRating)
            : undefined,
          stdDev: row.StdDev ? Number.parseFloat(row.StdDev) : undefined,
          minPlayers: row.MinPlayers
            ? Number.parseInt(row.MinPlayers)
            : undefined,
          maxPlayers: row.MaxPlayers
            ? Number.parseInt(row.MaxPlayers)
            : undefined,
          comAgeRec: row.ComAgeRec
            ? Number.parseFloat(row.ComAgeRec)
            : undefined,
          languageEase: row.LanguageEase
            ? Number.parseFloat(row.LanguageEase)
            : undefined,
          bestPlayers: row.BestPlayers,
          goodPlayers: row.GoodPlayers,
          numOwned: row.NumOwned ? Number.parseInt(row.NumOwned) : undefined,
          numWant: row.NumWant ? Number.parseInt(row.NumWant) : undefined,
          numWish: row.NumWish ? Number.parseInt(row.NumWish) : undefined,
          numWeightVotes: row.NumWeightVotes
            ? Number.parseInt(row.NumWeightVotes)
            : undefined,
          mfgPlaytime: row.MfgPlaytime
            ? Number.parseInt(row.MfgPlaytime)
            : undefined,
          comMinPlaytime: row.ComMinPlaytime
            ? Number.parseInt(row.ComMinPlaytime)
            : undefined,
          comMaxPlaytime: row.ComMaxPlaytime
            ? Number.parseInt(row.ComMaxPlaytime)
            : undefined,
          mfgAgeRec: row.MfgAgeRec ? Number.parseInt(row.MfgAgeRec) : undefined,
          numUserRatings: row.NumUserRatings
            ? Number.parseInt(row.NumUserRatings)
            : undefined,
          numComments: row.NumComments
            ? Number.parseInt(row.NumComments)
            : undefined,
          numAlternates: row.NumAlternates
            ? Number.parseInt(row.NumAlternates)
            : undefined,
          numExpansions: row.NumExpansions
            ? Number.parseInt(row.NumExpansions)
            : undefined,
          numImplementations: row.NumImplementations
            ? Number.parseInt(row.NumImplementations)
            : undefined,
          isReimplementation: row.IsReimplementation === "1",
          family: row.Family,
          kickstarted: row.Kickstarted === "1",
          imagePath: row.ImagePath,
          rankBoardgame: row["Rank:boardgame"]
            ? Number.parseInt(row["Rank:boardgame"])
            : undefined,
          rankStrategy: row["Rank:strategygames"]
            ? Number.parseInt(row["Rank:strategygames"])
            : undefined,
          rankAbstract: row["Rank:abstracts"]
            ? Number.parseInt(row["Rank:abstracts"])
            : undefined,
          rankFamily: row["Rank:familygames"]
            ? Number.parseInt(row["Rank:familygames"])
            : undefined,
          rankThematic: row["Rank:thematic"]
            ? Number.parseInt(row["Rank:thematic"])
            : undefined,
          rankCGS: row["Rank:cgs"]
            ? Number.parseInt(row["Rank:cgs"])
            : undefined,
          rankWargames: row["Rank:wargames"]
            ? Number.parseInt(row["Rank:wargames"])
            : undefined,
          rankParty: row["Rank:partygames"]
            ? Number.parseInt(row["Rank:partygames"])
            : undefined,
          rankChildrens: row["Rank:childrensgames"]
            ? Number.parseInt(row["Rank:childrensgames"])
            : undefined,
          catThematic: row["Cat:Thematic"] === "1",
          catStrategy: row["Cat:Strategy"] === "1",
          catWar: row["Cat:War"] === "1",
          catFamily: row["Cat:Family"] === "1",
          catCGS: row["Cat:CGS"] === "1",
          catAbstract: row["Cat:Abstract"] === "1",
          catParty: row["Cat:Party"] === "1",
          catChildrens: row["Cat:Childrens"] === "1",
        });
      })
      .on("end", () => resolve())
      .on("error", reject);
  });

  console.log("CSV Parsed. Inserting into DB...");
  await prisma.boardGame.createMany({
    data: games,
    skipDuplicates: true,
  });
  console.log("Database seeded!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
