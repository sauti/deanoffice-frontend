import {Component, Input, OnInit} from '@angular/core';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {FormBuilder, Validators} from '@angular/forms';
import {Specialization} from '../../../models/Specialization';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {FacultyService} from '../../../services/faculty.service';
import {Faculty} from '../../../models/Faculty';
import {ApplicationUser} from '../../../models/ApplicationUser';

@Component({
  selector: 'application-user-form',
  templateUrl: './application-user-form.component.html',
  styleUrls: ['./application-user-form.component.scss']
})
export class ApplicationUserFormComponent extends BaseReactiveFormComponent implements OnInit {
  @Input() updateForm = false;
  faculties: Faculty[] = [];

  constructor(private _formBuilder: FormBuilder, private _facultyService: FacultyService) {
    super();
    this.setInitialData();
  }

  setInitialData(data: Specialization = new Specialization()) {
    this.form = this._formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      facultyId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this._facultyService.getFaculties().subscribe((faculties: Faculty[]) => this.faculties = faculties)
  }

  reset() {
    this.form.reset();
  }

  invalid(): boolean {
    super.submit();
    if (this.form.invalid) {
      alert('Перевірте введені дані на правильність!');
    }
    return this.form.invalid;
  }

  getValue(): ApplicationUser {
    return this.form.getRawValue() as ApplicationUser;
  }
}
