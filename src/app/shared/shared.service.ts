import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  allDoneSubject = new Subject<boolean>;

  constructor() { }

}
