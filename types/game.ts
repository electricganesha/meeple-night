import { User } from "./user";

export interface Game {
  id?: number;
  bggId: number;
  name: string;
  description?: string;

  yearPublished?: number;
  gameWeight?: number;
  avgRating?: number;
  bayesAvgRating?: number;
  stdDev?: number;

  minPlayers?: number;
  maxPlayers?: number;

  comAgeRec?: number;
  languageEase?: number;

  bestPlayers?: string;
  goodPlayers?: string;

  numOwned?: number;
  numWant?: number;
  numWish?: number;
  numWeightVotes?: number;

  mfgPlaytime?: number;
  comMinPlaytime?: number;
  comMaxPlaytime?: number;
  mfgAgeRec?: number;

  numUserRatings?: number;
  numComments?: number;

  numAlternates?: number;
  numExpansions?: number;
  numImplementations?: number;

  isReimplementation: boolean;

  family?: string;
  kickstarted: boolean;

  imagePath?: string;

  rankBoardgame?: number;
  rankStrategy?: number;
  rankAbstract?: number;
  rankFamily?: number;
  rankThematic?: number;
  rankCGS?: number;
  rankWargames?: number;
  rankParty?: number;
  rankChildrens?: number;

  catThematic: boolean;
  catStrategy: boolean;
  catWar: boolean;
  catFamily: boolean;
  catCGS: boolean;
  catAbstract: boolean;
  catParty: boolean;
  catChildrens: boolean;

  createdAt: Date;
  updatedAt: Date;

  owners?: User[];
}
