import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {SpecializationService} from '../../../services/specialization.service';
import {ApplicationUserModalComponent} from '../application-user-modal/application-user-modal.component';
import {ApplicationUserFormComponent} from '../application-user-form/application-user-form.component';
import {ApplicationUserService} from '../../../services/application-user.service';

@Component({
  selector: 'create-application-user',
  templateUrl: './create-application-user.component.html',
  styleUrls: ['./create-application-user.component.scss']
})
export class CreateApplicationUserComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ApplicationUserModalComponent;
  @ViewChild('form') form: ApplicationUserFormComponent;

  constructor(private applicationUserService: ApplicationUserService) {
  }

  openModal(): void {
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid()) {
      return;
    }
    this.applicationUserService
      .create(this.form.getValue())
      .then(() => this.onSubmit.emit(null))
      .then(() => this.hideModal())
  }
}
