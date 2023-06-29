import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonChip } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements AfterViewInit, OnInit {
  @ViewChild('chipList') chipList: ElementRef;
  selectedChip: IonChip;

  allDoneSubscription: Subscription;

  constructor(
    public databaseService: DatabaseService,
    private sharedService: SharedService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.allDoneSubscription = this.sharedService.allDoneSubject.subscribe(
      (data) => {
        if (data === true) {
          this.selectedChip.color = 'primary';
        }
      }
    );
  }

  ngAfterViewInit(): void {
    let firstChip = <IonChip>this.chipList.nativeElement.children[0];
    firstChip.color = 'danger';
    this.selectedChip = firstChip;
    this.databaseService.categorySelectSubject.next(0);
    this.sharedService.allDoneSubject.next(false);
  }

  onSelectChip(chip: IonChip, index: number) {
    if (this.selectedChip) {
      this.selectedChip.color = 'primary';
    }
    chip.color = 'danger';
    this.selectedChip = chip;
    this.databaseService.categorySelectSubject.next(index);
    this.sharedService.allDoneSubject.next(false);
    this.router.navigate(['categories'])
  }
}
