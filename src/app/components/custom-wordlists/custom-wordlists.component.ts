import { Component, OnInit } from '@angular/core';
import { IonChip } from '@ionic/angular';
import { WordlistService } from 'src/app/shared/wordlist.service';

@Component({
  selector: 'app-custom-wordlists',
  templateUrl: './custom-wordlists.component.html',
  styleUrls: ['./custom-wordlists.component.css'],
})
export class CustomWordlistsComponent implements OnInit {
  constructor(public wordlistService: WordlistService) {}

  ngOnInit() {}

  onSelectChip(chip: IonChip, index: number) {
    // if (this.selectedChip) {
    //   this.selectedChip.color = 'primary';
    // }
    // chip.color = 'danger';
    // this.selectedChip = chip;
    this.wordlistService.wordlistSelectSubject.next(index);
    // this.sharedService.allDoneSubject.next(false);
  }
}
