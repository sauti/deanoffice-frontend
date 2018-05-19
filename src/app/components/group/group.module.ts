import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupTableComponent } from './group-table/group-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {GroupComponent} from './group.component';
import {PipeModule} from '../../pipes/pipe.module';
import { GroupModalComponent } from './group-modal/group-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule.forRoot(),
  ],
  declarations: [
    GroupTableComponent,
    GroupComponent,
    GroupModalComponent
  ],
  exports: [
    GroupComponent,
    GroupTableComponent
  ],
  entryComponents: [GroupModalComponent]
})
export class GroupModule { }
