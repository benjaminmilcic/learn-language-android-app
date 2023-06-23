import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wordlists',
  templateUrl: './wordlists.page.html',
  styleUrls: ['./wordlists.page.scss'],
})
export class WordlistsPage implements OnInit {
  wordlistMode: 'categories' | 'custom' = 'categories';

  constructor() {}

  ngOnInit() {}
}
