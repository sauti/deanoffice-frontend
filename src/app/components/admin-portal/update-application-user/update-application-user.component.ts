import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ApplicationUser} from '../../../models/ApplicationUser';
import {ApplicationUserModalComponent} from '../application-user-modal/application-user-modal.component';
import {ApplicationUserFormComponent} from '../application-user-form/application-user-form.component';
import {ApplicationUserService} from '../../../services/application-user.service';

@Component({
  selector: 'update-application-user',
  templateUrl: './update-application-user.component.html',
  styleUrls: ['./update-application-user.component.scss']
})
export class UpdateApplicationUserComponent {
  source: ApplicationUser;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ApplicationUserModalComponent;
  @ViewChild('form') form: ApplicationUserFormComponent;

  constructor(private applicationUserService: ApplicationUserService) { }

  getTitle(): string {
    let name: string = (this.source) ? this.source.username : '';
    return `Оновлення користувача: ${name}`;
  }

  openModal(sourceId: number): void {
    this.applicationUserService.getById(sourceId)
      .subscribe((source: ApplicationUser)=> {
        this.source = source;
        this.form.setInitialData(this.source);
        this.modal.show();
  });
  }

  hideModal(): void {
    this.modal.hide();
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid()) {
      return;
    }
    const applicationUser = this.form.getValue();
    this.applicationUserService.
      update(applicationUser)
      .then(() => this.onSubmit.emit(null))
      .then(() => this.hideModal())
      .catch(null);
  }
}
