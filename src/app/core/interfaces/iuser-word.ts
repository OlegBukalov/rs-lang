export interface IUserWord {
  difficulty?: string;
  optional?: IUserWordOptional;
}

export interface IUserWordOptional {
  category?: string;
  gamesStats?: IGameStats;
  repeatsCount?: number;
}

export interface IGameStats {
  rightAnswersCount?: number;
  wrongAnswersCount?: number;
}
