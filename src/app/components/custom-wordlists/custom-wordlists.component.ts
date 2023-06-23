import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonChip, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { WordlistService } from 'src/app/shared/wordlist.service';

@Component({
  selector: 'app-custom-wordlists',
  templateUrl: './custom-wordlists.component.html',
  styleUrls: ['./custom-wordlists.component.css'],
})
export class CustomWordlistsComponent implements OnInit {
  @ViewChild('chipList') chipList: ElementRef;
  selectedChip: IonChip;

  allDoneSubscription: Subscription;

  constructor(
    public wordlistService: WordlistService,
    private sharedService: SharedService,
    private modalController: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.allDoneSubscription = this.sharedService.allDoneSubject.subscribe(
      (data) => {
        if (data === true) {
          this.selectedChip.color = 'primary';
        }
      }
    );
  }

  ngAfterViewInit(): void {
    if (this.selectedChip) {
      this.selectedChip.color = 'primary';
    }
    let firstChip = <IonChip>this.chipList.nativeElement.children[0];
    firstChip.color = 'danger';
    this.selectedChip = firstChip;
    this.wordlistService.wordlistSelectSubject.next(0);
    this.sharedService.allDoneSubject.next(false);
  }

  onSelectChip(chip: IonChip, index: number) {
    if (this.selectedChip) {
      this.selectedChip.color = 'primary';
    }
    chip.color = 'danger';
    this.selectedChip = chip;
    this.wordlistService.wordlistSelectSubject.next(index);
    this.sharedService.allDoneSubject.next(false);
    this.navCtrl.back();
  }
}
