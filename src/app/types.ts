interface Entry {
  name: string;
  seed: number;
}

interface Selection extends Entry {
  votePercentage?: string;
  active?: boolean;
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

export {
  Selection,
  Match,
  Entry,
  BracketState,
};
