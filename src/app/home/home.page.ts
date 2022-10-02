import { Component, OnInit } from '@angular/core';
import { DatabaseService} from '../shared/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.fetchData();
  }

}
