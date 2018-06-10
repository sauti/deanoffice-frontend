import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IAppModal} from '../../shared/modal.interface';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'application-user-modal',
  templateUrl: './application-user-modal.component.html',
  styleUrls: ['./application-user-modal.component.scss']
})
export class ApplicationUserModalComponent implements IAppModal {
  @Input() title: string;
  @Output() hideModal: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalDirective;

  show(): void {
    this.modal.show();
  }

  emitHide() {
    this.hideModal.emit(null);
  }

  hide(): void {
    this.modal.hide();
  }
}
