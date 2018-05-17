import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {StudentGroup} from "../../../models/StudentGroup";

@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {
  @Input() group: StudentGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
