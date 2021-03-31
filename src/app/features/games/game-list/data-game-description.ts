import { IGameItem } from '../../../core/interfaces/igame-item';

export const GAMES_DESCRIPTION: IGameItem[] = [
  {
    id: 0,
    title: 'Саванна',
    titleEn: 'savannah',
    imgUrl: '../assets/img/game-description/game_savanna.jpg',
    routerLink: 'card-game',
  },
  {
    id: 1,
    title: 'Аудиовызов',
    titleEn: 'audio-call',
    imgUrl: '../assets/img/game-description/game_audio.jpg',
    routerLink: 'card-game',
  },
  {
    id: 2,
    title: 'Спринт',
    titleEn: 'sprint',
    imgUrl: '../assets/img/game-description/game_sprint.jpg',
    routerLink: 'card-game',
  },
  {
    id: 3,
    title: 'Своя игра',
    titleEn: 'card-game',
    imgUrl: '../assets/img/game-description/game_me.jpg',
    routerLink: 'card-game',
  },
];
