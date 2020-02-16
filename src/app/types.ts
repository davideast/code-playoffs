interface Selection {
  name: string;
  seed: number;
  votePercentage: string;
  active?: boolean;
}

interface Match {
  higher: Selection;
  lower: Selection;
}

export {
  Selection,
  Match,
};

