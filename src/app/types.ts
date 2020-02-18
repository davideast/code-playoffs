interface Entry {
  name: string;
  seed: number;
  active?: boolean;
}

interface Selection extends Entry {
  votePercentage?: string;
  voteId?: string;
  voteFor?: string;
  match?: Match;
}

interface Match {
  id?: string;
  higher: Selection;
  lower: Selection;
}

interface BracketState {
  round: number;
  matches: Match[];
  selections: Selection[];
}

interface Vote { 
  id: string; 
  uid: string;
  higherName: string;
  lowerName: string;
  higher: number; 
  lower: number; 
}

interface VoteUpdate { 
  id: string; 
  uid: string;
  higherName: string;
  lowerName: string;
  voteFor: string;
}

interface StoreState {
  entries: Entry[];
  votes: Vote[];
  selections: Selection[];
  user?: User;
}

interface User { 
  uid: string; 
  photoURL: string 
}

interface Tournament {
  name: string;
  seeds: string[];
}

export {
  Selection,
  Match,
  Entry,
  BracketState,
  Vote,
  StoreState,
  User,
  Tournament,
  VoteUpdate,
};
