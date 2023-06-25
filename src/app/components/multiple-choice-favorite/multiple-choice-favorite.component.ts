import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { FavoriteService } from 'src/app/shared/favorite.service';
import { MyVocable } from 'src/app/shared/models';
import { SharedService } from 'src/app/shared/shared.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Component({
  selector: 'app-multiple-choice-favorite',
  templateUrl: './multiple-choice-favorite.component.html',
  styleUrls: ['./multiple-choice-favorite.component.css'],
})
export class MultipleChoiceFavoriteComponent implements OnInit, OnDestroy {
  inputMode: 'multipleChoice' | 'text' = 'multipleChoice';

  

  playAudio = new Audio();
  audioMode: boolean = false;
  audioPath = '/assets/audio/';
  // audioPath = 'https://www.goethe-verlag.com/book2/_alleima/_mp3/';

  audioLanguage = 'HR';
  firstPlay: boolean;

  vocableList: MyVocable[] = [];

  wordListForButtons: string[] = [];
  wordToPractice: MyVocable;
  wordToPracticeIndex: number;
  wrongAnswered: boolean;
  numberOfButtons: number;
  styleOfButtons: string[] = [];
  defaultButtonStyle = '';

  languageFlag: string = '🇩🇪';
  language = 'german';
  otherLanguage = 'croatian';
  sprache = 'Deutsche';

  disabledWhileWaiting = false;

  // loadVocableListSubscription: Subscription;
  loadFavoriteListSubscription: Subscription;

  wordInput = '';
  styleOfInput = '';

  constructor(
    public databaseService: DatabaseService,
    private sharedService: SharedService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.sharedService.vocableList = [...this.favoriteService.favoriteList];
    this.vocableList = this.sharedService.vocableList;
    this.startMultipleChoice(false);

   

    this.loadFavoriteListSubscription =
      this.sharedService.loadFavoriteListSubject.subscribe((vocableList) => {
        this.sharedService.vocableList = [...vocableList];
        this.vocableList = this.sharedService.vocableList;
        this.startMultipleChoice(false);
      });
  }

  private startMultipleChoice(play: boolean) {
    const existWordsToPractice = this.checkIfExistWordsToPractice();
    if (existWordsToPractice) {
      this.createVocableButtons(play);
    }
  }

  private checkIfExistWordsToPractice() {
    return this.vocableList.length > 0 ? true : false;
  }

  createVocableButtons(play: boolean = true) {
    this.deleteWordListForButtons();
    this.setNumberOfButtons();
    this.setDefaultButtonStyles();
    this.setDefaultInputStyle();
    this.setWordToPractice();
    this.putWordToPracticeOnOneButton();
    this.fillOtherButtonsWithRandomWords();
    this.randomizeButtonOrder();
    this.setWrongAnsweredToFalse();
    this.playAudioIfSetToPlay(play);
  }

  private deleteWordListForButtons() {
    this.wordListForButtons = [];
  }

  private setNumberOfButtons() {
    this.numberOfButtons = 5;
    const lessVocablesToPracticeThanButtons: boolean =
      this.vocableList.length < this.numberOfButtons;
    if (lessVocablesToPracticeThanButtons) {
      this.numberOfButtons = this.vocableList.length;
    }
  }

  private setDefaultButtonStyles() {
    this.styleOfButtons = [];
    for (let buttonNr = 0; buttonNr < this.numberOfButtons; buttonNr++) {
      this.styleOfButtons[buttonNr] = this.defaultButtonStyle;
    }
  }

  private setWordToPractice() {
    this.wordToPracticeIndex = Math.floor(
      Math.random() * this.vocableList.length
    );
    this.wordToPractice = this.vocableList[this.wordToPracticeIndex];
  }

  private putWordToPracticeOnOneButton() {
    this.wordListForButtons[0] = this.wordToPractice[this.language];
  }

  private fillOtherButtonsWithRandomWords() {
    let allButtonsAreFilled: boolean =
      this.wordListForButtons.length >= this.numberOfButtons;

    while (!allButtonsAreFilled) {
      const randomWord = this.createRandomWord();
      const buttonWithThisWordAlreadyExist: boolean =
        this.checkIfButtonWithThisWordAlreadyExist(randomWord);

      if (!buttonWithThisWordAlreadyExist) {
        this.addWordToButtonList(randomWord);
      }

      allButtonsAreFilled =
        this.wordListForButtons.length === this.numberOfButtons;
    }
  }

  private createRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.vocableList.length);
    const randomWord = this.vocableList[randomIndex];
    return randomWord[this.language];
  }

  private checkIfButtonWithThisWordAlreadyExist(word: string) {
    let buttonWithThisWordAlreadyExist!: boolean;

    for (
      let buttonNr = 0;
      buttonNr < this.wordListForButtons.length;
      buttonNr++
    ) {
      buttonWithThisWordAlreadyExist =
        this.wordListForButtons[buttonNr] === word;
      if (buttonWithThisWordAlreadyExist) {
        break;
      }
    }
    return buttonWithThisWordAlreadyExist;
  }

  private addWordToButtonList(word: string) {
    this.wordListForButtons.push(word);
  }

  private randomizeButtonOrder() {
    this.wordListForButtons.sort(() => 0.5 - Math.random());
  }

  private setWrongAnsweredToFalse() {
    this.wrongAnswered = false;
  }

  private playAudioIfSetToPlay(play: boolean) {
    if (play && this.audioMode) {
      this.onPlayAudio();
    }
  }

  onButtonClick(buttonNr: number) {
    this.disabledWhileWaiting = true;
    const isRightAnswer: boolean =
      this.wordToPractice[this.language] === this.wordListForButtons[buttonNr];
    this.setButtonColorAndContinue(buttonNr, isRightAnswer);
  }

  private setButtonColorAndContinue(buttonNr: number, isRightAnswer: boolean) {
    if (isRightAnswer) {
      this.styleOfButtons[buttonNr] = 'right';
      this.switchToNextWord();
    } else {
      this.disabledWhileWaiting = false;
      this.styleOfButtons[buttonNr] = 'wrong';
      this.wrongAnswered = true;
    }
  }

  private async switchToNextWord() {
    const wait = new Promise((resolve) => setTimeout(resolve, 1500));
    await wait.then(() => {
      this.wordInput = '';
      this.disabledWhileWaiting = false;
      if (!this.wrongAnswered) {
        this.wrongAnswered = false;
        this.vocableList.splice(this.wordToPracticeIndex, 1);
        this.sharedService.vocableListChangeSubject.next([...this.vocableList]);
      }
      const existWordsToPractice = this.checkIfExistWordsToPractice();
      if (existWordsToPractice) {
        this.createVocableButtons();
      } else {
        this.sharedService.allDoneFavoriteSubject.next(true);
      }
    });
  }

  onToggleLanguage() {
    if (this.language === 'german') {
      this.language = 'croatian';
      this.otherLanguage = 'german';
      this.audioLanguage = 'DE';
      this.sprache = 'Kroatische';
      this.languageFlag = '🇭🇷';
    } else {
      this.language = 'german';
      this.otherLanguage = 'croatian';
      this.audioLanguage = 'HR';
      this.sprache = 'Deutsche';
      this.languageFlag = '🇩🇪';
    }
    this.createVocableButtons(false);
  }

  onChangeMode(segment: IonSegment) {
    if (segment.value === 'audio') {
      this.audioMode = true;
    } else {
      this.audioMode = false;
    }
  }

  async onPlayAudio() {
    // this.playAudio.src =
    //   this.audioPath +
    //   this.audioLanguage +
    //   '/' +
    //   this.wordToPractice.audio +
    //   '.mp3';

    const playLanguage = this.otherLanguage === 'german' ? 'de-de' : 'hr-hr';

    this.playAudio.src =
      'https://api.voicerss.org/?key=5cde9db8cff64cc2b675b76dfcadb68f&r=-3&hl=' +
      playLanguage +
      '&src=' +
      this.wordToPractice[this.otherLanguage];

    this.playAudio.play();
  }

  getActiveModeSegment() {
    return this.audioMode ? 'audio' : 'text';
  }

  skipWord() {
    this.createVocableButtons();
  }

  toggleFavorite(wordToPractice: MyVocable) {
    this.favoriteService.toggleFavorite(wordToPractice);
  }

  isFavoriteIconColor(wordToPractice: MyVocable): string {
    // this.favoriteService.favoriteList.includes(wordToPractice)
    // does not work, but checking for wordToPractice.audio key works

    if (
      this.favoriteService.favoriteList
        .map((word) => word.audio)
        .includes(wordToPractice.audio)
    ) {
      return 'warning';
    } else {
      return 'default';
    }
  }

  isFavoriteIconName(wordToPractice: MyVocable): string {
    // this.favoriteService.favoriteList.includes(wordToPractice)
    // does not work, but checking for wordToPractice.audio key works

    if (
      this.favoriteService.favoriteList
        .map((word) => word.audio)
        .includes(wordToPractice.audio)
    ) {
      return 'star';
    } else {
      return 'star-outline';
    }
  }

  onProof() {
    const isRightAnswer: boolean =
      this.wordInput.trim() === this.wordToPractice[this.language];
    this.setInputColorAndContinue(isRightAnswer);
  }

  private setInputColorAndContinue(isRightAnswer: boolean) {
    if (isRightAnswer) {
      this.styleOfInput = 'right';
      this.switchToNextWord();
    } else {
      this.styleOfInput = 'wrong';
      this.wrongAnswered = true;
    }
  }

  private setDefaultInputStyle() {
    this.styleOfInput = '';
  }

  async onSpeech() {
    const { available } = await SpeechRecognition.available();
    if (available) {
      const speechLanguage = this.language === 'german' ? 'de-DE' : 'hr-HR';
      await SpeechRecognition.start({
        popup: true,
        language: speechLanguage,
        partialResults: false,
        prompt: 'Vokabel einsprechen',
        maxResults: 1,
      }).then((data) => {
        this.wordInput = data.matches[0];
        this.onProof();
      });
    }
  }

  onRepeat() {
    this.sharedService.allDoneFavoriteSubject.next(false);
    this.sharedService.loadFavoriteListSubject.next([
      ...this.favoriteService.favoriteList,
    ]);
  }

  ngOnDestroy() {
    this.loadFavoriteListSubscription.unsubscribe();
  }
}
