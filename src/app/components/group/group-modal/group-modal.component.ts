import {Component, Inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {StudentGroup} from "../../../models/StudentGroup";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';

@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {
  @Input() group: StudentGroup;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.buildForm();

  }

   private buildForm() {
     this.form = this.fb.group({
       name: [this.group.name, Validators.required],
       specialization: [this.group.specialization.name, Validators.required],
       beginYears: [this.group.beginYears, Validators.required],
       creationYear: [this.group.creationYear, Validators.required],
       studySemesters: [this.group.studySemesters, Validators.required],
       studyYears: [this.group.studyYears, Validators.required],
       tuitionTerm: [this.group.tuitionTerm, Validators.required],
       tuitionForm: [this.group.tuitionForm, Validators.required],
     });
  }

}
