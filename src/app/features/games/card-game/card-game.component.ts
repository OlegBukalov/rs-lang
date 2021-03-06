import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { IWord } from 'src/app/core/interfaces/iword';
import { WordsApiService } from 'src/app/core/services/wordsApi.service';
import { StatisticsService } from 'src/app/features/statistics/statistics.service';
import { GameID } from 'src/app/features/statistics/enums/game-id.enum';
import { DictionaryService } from 'src/app/core/services/dictionary.service';
import { IComponentCanDeactivate } from './guards/exit-card-game.guard';
import { DialogElementsExampleDialogComponent } from './card-game-modal/card-game-modal.component';
import { OwnGameService } from './services/own-game.service';
import { GameState } from './services/gameState.state';

import { environment } from '../../../../environments/environment';
import { DictionaryCategory } from '../../dictionary/dictionary-category';

const ID_GAME = GameID.CardGame;

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss'],
})
export class CardGameComponent implements OnInit, OnDestroy, IComponentCanDeactivate {
  LOSS_QUANTITY = 2;

  words: IWord[];
  previousPageWords: IWord[];
  playingWordIndexes: number[] = [];
  hardWords: IWord[] = [];

  correctWords: string[] = [];
  wrongWords: string[] = [];

  playingWord: IWord;
  countTry: number = this.wordsApiService.INIT_MISTAKES_COUNTER;
  leftCards: number;
  currentPage: number;
  totalCategories: number = this.wordsApiService.TOTAL_CATEGORIES;
  totalPageCards: number = this.wordsApiService.TOTAL_PAGE_CARDS;
  isHiddenDataChild = false;
  isSaved: boolean = this.ownGameService.isSaved;
  isHiddenChildCard: boolean;
  isLoading: boolean;
  isTextbookGameOpen: boolean;
  wordCounter = 0;
  correctWordCounter = 0;
  maxCorrectSequence = 0;
  currentMaxCorrectSequence = 0;
  currentCategory: DictionaryCategory;
  state = GameState;
  currentState: GameState = GameState.STOP;

  private currentWordsSubscription: Subscription;
  private previousWordsSubscription: Subscription;

  readonly baseCardURL = environment.dataURL;

  get leftCardsCount(): number {
    return this.playingWordIndexes.length;
  }

  constructor(
    private wordsApiService: WordsApiService,
    private ownGameService: OwnGameService,
    public dialog: MatDialog,
    private statisticsService: StatisticsService,
    private dictionaryService: DictionaryService,
  ) {}

  ngOnInit(): void {
    this.getData();
    this.isTextbookGameOpen = this.wordsApiService.getTextbookGameOpenFlag();
  }

  getGeneratedArray(length: number): number[] {
    return Array.from({ length }, (_, id) => id);
  }

  setCurrentState(state: GameState): void {
    this.currentState = state;
  }

  getData() {
    this.isLoading = true;
    this.currentWordsSubscription = this.wordsApiService.getRandomWordList().subscribe((data) => {
      this.words = data;
      this.currentPage = this.wordsApiService.getPageToken();
      if (this.currentPage !== 0 && this.words.length < this.wordsApiService.WORDS_PER_PAGE) {
        this.addPreviousData();
      } else {
        this.isLoading = false;
        this.leftCards = this.words.length;
      }
    });
  }

  addPreviousData() {
    const quantityDifference = this.wordsApiService.WORDS_PER_PAGE - this.words.length;
    const previousPage = this.currentPage - 1;
    this.wordsApiService.changePageToken(previousPage.toString());
    this.previousWordsSubscription = this.wordsApiService.getRandomWordList().subscribe((data) => {
      this.previousPageWords = data;
      const slicedPreviousPageWords = this.previousPageWords.slice(0, quantityDifference);
      this.words = this.words.concat(slicedPreviousPageWords);
      this.isLoading = false;
      this.leftCards = this.words.length;
    });
  }

  initializeValuesForGame(): void {
    this.playingWordIndexes = this.words.map((_, ind) => ind).sort(() => Math.random() - 0.5);
    this.hardWords = [];

    this.correctWords = [];
    this.wrongWords = [];

    this.playingWord = null;
    this.countTry = this.wordsApiService.INIT_MISTAKES_COUNTER;
    this.leftCards = this.words.length;
    this.isHiddenDataChild = false;
    this.isHiddenChildCard = false;
    this.ownGameService.setIsSaved(true);
    this.setCurrentState(GameState.STOP);
    this.isHiddenChildCard = false;
    this.wordCounter = 0;
    this.correctWordCounter = 0;
    this.maxCorrectSequence = 0;
    this.currentMaxCorrectSequence = 0;
  }

  startGame() {
    this.setCurrentState(GameState.PLAY);
    this.playingWordIndexes = this.words.map((_, ind) => ind).sort(() => Math.random() - 0.5);
    this.isHiddenDataChild = true;
    this.ownGameService.setIsSaved(false);
    this.definePlayingWord();
  }

  definePlayingWord() {
    this.playingWord = this.leftCardsCount ? this.words[this.playingWordIndexes[0]] : null;
    this.ownGameService.setDisabledItemId(this.playingWord.id);
    this.playCard();
  }

  playCard(): void {
    this.startPlayingWordAudio();
    this.countTry = 0;
    this.setCurrentState(GameState.HOLD);
  }

  startPlayingWordAudio(): void {
    if (this.playingWord) {
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.playingWord.audio}`;
      audioInstance.play();
    }
  }

  checkCard(card: IWord): void {
    if (this.playingWord) {
      if (this.playingWord.audio === card.audio) {
        this.playResultAudio(true);

        this.correctWords.push(this.playingWord.id);

        this.wordCounter += 1;
        this.correctWordCounter += 1;
        this.currentMaxCorrectSequence += 1;
        this.leftCards -= 1;
        this.ownGameService.setDisabledItemId(card.id);
        this.playingWordIndexes.shift();
        this.countMistakes();
        this.checkFinishGame();
      } else {
        this.playResultAudio(false);
        this.countTry += 1;

        this.wrongWords.push(this.playingWord.id);

        this.wordCounter += 1;
        this.setMaxCorrectSequence(this.currentMaxCorrectSequence);
        this.currentMaxCorrectSequence = 0;
      }
    }
  }

  addWordsToDictionary(words: string[], category: DictionaryCategory) {
    this.dictionaryService.addWordsToDictionary(words, category);
  }

  checkFinishGame(): void {
    if (this.playingWordIndexes.length) {
      this.playNextWord();
    } else {
      this.finishGame();
    }
  }

  playResultAudio(isCorrect: boolean) {
    const audioInstance = new Audio();
    audioInstance.src = isCorrect
      ? '../../../../assets/sounds/yes.mp3'
      : '../../../../assets/sounds/no.mp3';
    audioInstance.play();
  }

  finishGame(): void {
    const dataGame = {
      idGame: ID_GAME,
      countAll: this.wordCounter,
      countRight: this.correctWordCounter,
      maxRight: this.maxCorrectSequence,
    };
    this.statisticsService.setDataFromGame(dataGame);

    this.setCurrentState(GameState.RESULT);
    this.isHiddenChildCard = false;

    this.addWordsToDictionary([...new Set(this.correctWords)], DictionaryCategory.Studied);
    this.addWordsToDictionary([...new Set(this.wrongWords)], DictionaryCategory.Hard);

    const audioInstance = new Audio();
    audioInstance.src = '../../../../assets/sounds/466133__humanoide9000__victory-fanfare.wav';
    audioInstance.play();
  }

  countMistakes() {
    if (this.countTry > this.LOSS_QUANTITY) {
      this.hardWords.push(this.playingWord);
    }
  }

  setMaxCorrectSequence(value: number): void {
    if (this.maxCorrectSequence < value) {
      this.maxCorrectSequence = value;
    }
  }

  playNextWord() {
    setTimeout(() => {
      this.definePlayingWord();
    }, 1700);
  }

  repeatWord() {
    if (this.playingWord) {
      const audioInstance = new Audio();
      audioInstance.src = `${this.baseCardURL + this.playingWord.audio}`;
      audioInstance.play();
    }
  }

  mixCards() {
    this.wordsApiService.randomize(this.words);
    this.initializeValuesForGame();
  }

  changeLevel(level: string) {
    const randomPage: string = Math.floor(Math.random() * this.totalPageCards).toString();
    this.wordsApiService.changeGroupToken(level);
    this.wordsApiService.changePageToken(randomPage);
    this.getData();
    this.initializeValuesForGame();
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.ownGameService.isSaved) {
      return true;
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(DialogElementsExampleDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }

  ngOnDestroy() {
    this.ownGameService.isSaved = true;
    this.currentWordsSubscription.unsubscribe();
    if (this.previousWordsSubscription) this.previousWordsSubscription.unsubscribe();
  }
}
