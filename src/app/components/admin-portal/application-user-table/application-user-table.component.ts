import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ApplicationUser} from '../../../models/ApplicationUser';

const columns: string[] = [
  'firstName',
  'lastName',
  'username',
  'faculty',
];

export const tableHeaderTranslations = {
  'firstName': 'Ім\'я',
  'lastName': 'Прізвище',
  'username': 'Нік',
  'faculty': 'Факультет',
};

@Component({
  selector: 'app-application-user-table',
  templateUrl: './application-user-table.component.html',
  styleUrls: ['./application-user-table.component.scss']
})
export class ApplicationUserTableComponent implements OnInit {
  @Input() rows: ApplicationUser[];
  @Input() loading: boolean;
  @Output() onSelect: EventEmitter<ApplicationUser> = new EventEmitter<ApplicationUser>();
  @ViewChild('facultyTemplate') facultyTemplate: TemplateRef<any>;

  selected: ApplicationUser;
  columns = [];

  ngOnInit() {
    this.columns = this._transformArrayToColumns();
  }

  private _transformArrayToColumns(): Object[] {
    const templatesMap = {
      'faculty': {
        cellTemplate: this.facultyTemplate
      },
      'selected': {
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 30
      }
    };

    return ['selected', ...columns].map(prop => {
      return {prop, name: tableHeaderTranslations[prop], ...templatesMap[prop]};
    });
  }

  getRowIdentity(row) {
    return row.id;
  }

  select({selected}) {
    this.handleSelect([...selected].pop())
  }

  handleSelect(applicationUser: ApplicationUser) {
    this.selected = applicationUser;
    this.onSelect.emit(this.selected);
  }

  activate({type, row, column}) {
    if (type !== 'click' || column.prop === 'selected') {
      return;
    }
    if (this.selected === row) {
      this.selected = null;
      this.onSelect.emit(this.selected);
    } else {
      this.handleSelect(row);
    }
  }

  getSelected() {
    return (this.selected) ? [this.selected] : [];
  }
}
