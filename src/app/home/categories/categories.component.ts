import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IonChip } from '@ionic/angular';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements AfterViewInit {

  @ViewChild('chipList') chipList: ElementRef;
  selectedChip: IonChip;

  constructor(public databaseService: DatabaseService) { }

  ngAfterViewInit(): void {
    let firstChip = <IonChip>this.chipList.nativeElement.children[0];
    firstChip.color = 'danger';
    this.selectedChip = firstChip;
  }

  onSelectChip(chip: IonChip, index: number) {
    if (this.selectedChip) {
      this.selectedChip.color = 'primary';
    }
    chip.color = 'danger';
    this.selectedChip = chip;
    this.databaseService.categorySelectSubject.next(index);
  }

}
