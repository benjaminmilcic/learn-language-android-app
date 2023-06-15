import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';
import { ModalAddWordComponent } from 'src/app/components/modal-add-word/modal-add-word.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NotesPageRoutingModule],
  declarations: [NotesPage, ModalAddWordComponent],
})
export class NotesPageModule {}
