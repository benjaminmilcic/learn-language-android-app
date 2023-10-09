import { Component } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    SpeechRecognition.requestPermissions();
    // NavigationBar.setColor({ color: '#FFFFFF', darkButtons: true });
    // StatusBar.setBackgroundColor({ color: '#FFFFFF' });
  }
}
