import {Component, OnInit} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';
import {TuitionTerm} from '../../models/tuition-term.enum';
import {TuitionForm} from '../../models/tuition-form.enum';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GroupModalComponent} from "./group-modal/group-modal.component";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groups: StudentGroup[] = [];
  actualGroups: boolean | true;
  searchText: string;
  selectedGroups = [];
  loadingGroups = true;
  constructor(private groupService: GroupService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups(onlyActual: boolean = true): void {
    this.loadingGroups = true;
    this.groupService.getGroups(onlyActual)
      .subscribe((groups: StudentGroup[]) => {
        this.groups = groups;
        this.actualGroups = onlyActual;
        this.loadingGroups = false;
        this.setTuitionForm();
        this.setTuitionTerm();
      });
  }

  setTuitionForm() {
    this.groups.map(group => {
      group.tuitionForm = this.translateTuitionForm(group.tuitionForm);
      return group;
    })
  }
  setTuitionTerm() {
    this.groups.map(group => {
      group.tuitionTerm = this.translateTuitionTerm(group.tuitionTerm);
      return group;
    })
  }

  private translateTuitionForm(form: TuitionForm) {
    return TuitionForm[form];
  }

  private translateTuitionTerm(term: TuitionTerm) {
    return TuitionTerm[term];
  }

  openModal(group){
    const modalRef = this.modalService.open(GroupModalComponent, {size: 'lg'});
    modalRef.componentInstance.group = group;
  }

  onSelect(groups){
    this.selectedGroups = groups;
    console.log(this.selectedGroups);
  }

}
