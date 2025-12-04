import { Account } from "./account";
import { Game } from "./game";
import { Session } from "./session";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  sessions: Session[];
  accounts: Account[];
  collection: Game[];
}
