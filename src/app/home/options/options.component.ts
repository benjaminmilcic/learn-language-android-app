import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';
import { MyVocable } from 'src/app/shared/models';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit, OnDestroy {

  categorySelectSubscription: Subscription;
  vocableList: MyVocable[];
  fullVocableList: MyVocable[];
  loadedVocableList: MyVocable[];

  selectedCategoryName: string;
  selectedCategoryIndex: number;
  existVocableListToLoad: boolean;

  vocableListChangeSubscription: Subscription;

  constructor(private databaseService: DatabaseService, private sharedService: SharedService) { }

  ngOnInit() {
    this.categorySelectSubscription = this.databaseService.categorySelectSubject.subscribe(index => {
      this.selectedCategoryIndex = index;
      this.sharedService.vocableList = this.databaseService.getVocableList(index);
      this.vocableList = this.sharedService.vocableList;
      this.fullVocableList = [...this.vocableList];
      this.existVocableListToLoad = false;
      if (localStorage.getItem('vocableList' + index) != null) {
        this.existVocableListToLoad = true;
        this.loadedVocableList = JSON.parse(localStorage.getItem('vocableList' + index));
      }
      this.selectedCategoryName = this.databaseService.categories[index];
    }
    );
    this.vocableListChangeSubscription =
      this.sharedService.vocableListChangeSubject.subscribe(vocableList => {
      this.vocableList = vocableList;
    });
  }

  onSaveVocableList() {
    this.existVocableListToLoad = true;
    localStorage.setItem('vocableList' + this.selectedCategoryIndex, JSON.stringify(this.vocableList));
    this.loadedVocableList = JSON.parse(localStorage.getItem('vocableList' + this.selectedCategoryIndex));
  }

  onLoadVocableList() {
    this.sharedService.vocableList = [...this.loadedVocableList];
    this.vocableList = this.sharedService.vocableList;
    this.sharedService.loadVocableListSubject.next(this.vocableList);
  }

  onResetVocableList() {
    this.sharedService.vocableList = [...this.fullVocableList];
    this.vocableList = this.sharedService.vocableList;
    this.sharedService.loadVocableListSubject.next(this.vocableList);
  }

  ngOnDestroy() {
    this.categorySelectSubscription.unsubscribe();
    this.vocableListChangeSubscription.unsubscribe();
  }

}
