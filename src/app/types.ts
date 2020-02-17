interface Entry {
  name: string;
  seed: number;
  active?: boolean;
}

interface Selection extends Entry {
  votePercentage?: string;
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
  higher: number; 
  lower: number; 
}

interface StoreState {
  entries: Entry[],
  votes: Vote[],
  selections: Selection[]
}

export {
  Selection,
  Match,
  Entry,
  BracketState,
  Vote,
  StoreState,
};
