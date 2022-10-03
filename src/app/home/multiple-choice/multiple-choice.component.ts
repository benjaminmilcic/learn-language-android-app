import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { MyVocable } from 'src/app/shared/models';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit, OnDestroy {

  playAudio = new Audio;
  audioMode: boolean = false;
  audioPath = 'https://www.goethe-verlag.com/book2/_alleima/_mp3/';
  audioLanguage = 'HR';
  firstPlay: boolean;

  categorySelectSubscription: Subscription;
  vocableList: MyVocable[] = [];

  wordListForButtons: string[] = [];
  wordToPractice: MyVocable;
  wordToPracticeIndex: number;
  wrongAnswered: boolean;
  numberOfButtons: number;
  styleOfButtons: string[] = [];
  defaultButtonStyle = '';

  languageFlag: string = '🇩🇪';
  language = "german";
  otherLanguage = "croatian";
  sprache = 'Deutsche';

  disabledWhileWaiting = false;
  allDone = false;
  allDoneSubscription: Subscription;

  constructor(public databaseService: DatabaseService, private sharedService: SharedService) { }

  ngOnInit() {
    this.allDoneSubscription = this.sharedService.allDoneSubject.subscribe(data => {
      this.allDone = data;
    });
    this.categorySelectSubscription = this.databaseService.categorySelectSubject.subscribe(category => {
      this.vocableList = this.databaseService.getVocableList(category);
      this.sharedService.allDoneSubject.next(false);

      // this code ist for testing... it reduces the vocableList to 2 Elements
      // this.vocableList.splice(2, this.vocableList.length - 2);

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

  private createVocableButtons(play: boolean = true) {

    this.deleteWordListForButtons();
    this.setNumberOfButtons();
    this.setDefaultButtonStyles();
    this.setWordToPractice();
    this.putWordToPracticeOnOneButton();
    this.fillOtherButtonsWithRandomWords()
    this.randomizeButtonOrder();
    this.setWrongAnsweredToFalse();
    this.playAudioIfSetToPlay(play);
  }

  private deleteWordListForButtons() {
    this.wordListForButtons = [];
  }

  private setNumberOfButtons() {
    this.numberOfButtons = 5;
    const lessVocablesToPracticeThanButtons: boolean = this.vocableList.length < this.numberOfButtons;
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
    this.wordToPracticeIndex = Math.floor((Math.random() * this.vocableList.length));
    this.wordToPractice = this.vocableList[this.wordToPracticeIndex];
  }

  private putWordToPracticeOnOneButton() {
    this.wordListForButtons[0] = this.wordToPractice[this.language];
  }

  private fillOtherButtonsWithRandomWords() {
    let allButtonsAreFilled: boolean = this.wordListForButtons.length >= this.numberOfButtons;

    while (!allButtonsAreFilled) {

      const randomWord = this.createRandomWord();
      const buttonWithThisWordAlreadyExist: boolean = this.checkIfButtonWithThisWordAlreadyExist(randomWord);

      if (!buttonWithThisWordAlreadyExist) {
        this.addWordToButtonList(randomWord);
      }

      allButtonsAreFilled = this.wordListForButtons.length === this.numberOfButtons;
    }
  }

  private createRandomWord() {
    const randomIndex = Math.floor((Math.random() * this.vocableList.length));
    const randomWord = this.vocableList[randomIndex];
    return randomWord[this.language];
  }

  private checkIfButtonWithThisWordAlreadyExist(word: string) {
    let buttonWithThisWordAlreadyExist!: boolean;

    for (let buttonNr = 0; buttonNr < this.wordListForButtons.length; buttonNr++) {
      buttonWithThisWordAlreadyExist = this.wordListForButtons[buttonNr] === word;
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
    const isRightAnswer: boolean = this.wordToPractice[this.language] === this.wordListForButtons[buttonNr];
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
    const wait = new Promise(resolve => setTimeout(resolve, 1500));
    await wait.then(() => {
      this.disabledWhileWaiting = false;
      if (!this.wrongAnswered) {
        this.wrongAnswered = false;
        this.vocableList.splice(this.wordToPracticeIndex, 1);
      }
      const existWordsToPractice = this.checkIfExistWordsToPractice();
      if (existWordsToPractice) {
        this.createVocableButtons();
      } else {
        this.sharedService.allDoneSubject.next(true);
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

  onPlayAudio() {
    this.playAudio.src = this.audioPath + this.audioLanguage + '/' + this.wordToPractice.audio + '.mp3';
    this.playAudio.play();
  }

  ngOnDestroy() {
    this.categorySelectSubscription.unsubscribe();
  }

}
