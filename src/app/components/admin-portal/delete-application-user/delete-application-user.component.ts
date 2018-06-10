import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IAppModal} from '../../shared/modal.interface';
import {ModalDirective} from 'ngx-bootstrap';
import {ApplicationUserService} from '../../../services/application-user.service';
import {ApplicationUser} from '../../../models/ApplicationUser';

@Component({
  selector: 'delete-application-user',
  templateUrl: './delete-application-user.component.html',
  styleUrls: ['./delete-application-user.component.scss']
})
export class DeleteApplicationUserComponent implements IAppModal {
  applicationUser: ApplicationUser;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalDirective;

  constructor(private applicationUserService: ApplicationUserService) {
  }

  openModal(item: ApplicationUser): void {
    this.applicationUser = item;
    this.modal.show();
  }

  submit(): void {
    const IsConfirm = confirm('Ви дійсно бажаєте видалити обраного користувача?');

    if (IsConfirm) {
      this.applicationUserService
        .delete(this.applicationUser.id)
        .then(() => {
          this.onSubmit.emit(null);
          this.modal.hide()
        });
    }
  }

  hideModal(): void {
    this.modal.hide();
  }
}
