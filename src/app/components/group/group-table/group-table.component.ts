import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';
import {TuitionTerm} from '../../../models/tuition-term.enum';
import {TuitionForm} from '../../../models/tuition-form.enum';

@Component({
  selector: 'group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent {
  @Input('rows') rows: StudentGroup[];
  @Input() searchText: string;
  @Output() onSelect = new EventEmitter();
  selected = [];

  @Input() loading: boolean;

  select({selected}){

    this.onSelect.emit(selected);
  }


}
