import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import {StudentGroup} from '../../../models/StudentGroup';
import {StudentDegree} from '../../../models/StudentDegree';
import {months} from '../constants.js';

@Component({
    selector: 'app-students-filters',
    templateUrl: './students-filters.component.html',
    styleUrls: ['./students-filters.component.scss'],
})
export class StudentsFiltersComponent {
  model = {
    group: '',
    payment: [
      {label: 'Бюджет', value: 'BUDGET', selected: true},
      {label: 'Контракт', value: 'CONTRACT', selected: true},
    ],
    birthDate: '',
    birthMonth: ''
  };
  form: FormGroup;
  months: string[] = months;
  private rows: StudentDegree[];
  @Input() groups: StudentGroup[];
  @Input() set students(data: StudentDegree[]) {
    this.rows = data;
    this.setFilters();
  };
  @Output() applyFilters = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  get payment(): FormArray {
    return this.form.get('payment') as FormArray;
  }

  setFilters() {
    setTimeout(() => {
      const students = this.rows.filter(entry => this.filter(entry));
      this.applyFilters.emit(students);
    }, 0)
  }

  resetFilters() {
    this.buildForm();
    this.applyFilters.emit(this.rows);
  }

  private buildForm() {
    this.form = this.fb.group({
      group: this.model.group,
      payment: this.fb.array(this.model.payment.map(entry =>
        this.fb.group(entry)),
      ),
      birthDate: this.model.birthDate,
      birthMonth: this.model.birthMonth,
    });
  }

  private filter(entry: StudentDegree): Boolean {
    const { group, payment, birthDate, birthMonth } = this.form.value;
    const isGroupMatch = !group || (entry.studentGroup && entry.studentGroup.name === group);

    let isBirthDateMatch = true;
    if (birthDate) {
      isBirthDateMatch = entry.student.birthDate
        ? new Date(birthDate).getTime() === new Date(entry.student.birthDate).getTime()
        : false;
    }

    let isBirthMonthMatch = true;
    if (birthMonth) {
      isBirthMonthMatch = entry.student.birthDate
        ? birthMonth === new Date(entry.student.birthDate).getMonth()
        : false;
    }

    const payments = payment
      .filter(val => val.selected)
      .map(val => val.value);
    const isPaymentMatch = payments.includes(entry.payment);

    return isGroupMatch && isBirthDateMatch && isBirthMonthMatch && isPaymentMatch;
  }
}
