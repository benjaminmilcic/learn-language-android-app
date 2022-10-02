import { Component } from '@angular/core';
import { IonChip } from '@ionic/angular';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  selectedChip: IonChip;

  constructor(public databaseService: DatabaseService) { }

  onSelectChip(chip: IonChip, index: number) {
    if (this.selectedChip) {
      this.selectedChip.color = 'primary';
    }
    chip.color = 'danger';
    this.selectedChip = chip;
    this.databaseService.setVocableList(index);
  }

}
