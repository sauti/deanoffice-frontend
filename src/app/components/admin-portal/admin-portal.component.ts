import {Component, OnInit} from '@angular/core';
import {ApplicationUser} from '../../models/ApplicationUser';
import {ApplicationUserService} from '../../services/application-user.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.scss']
})
export class AdminPortalComponent implements OnInit {
  applicationUsers: ApplicationUser[] = [];
  selectedApplicationUser: ApplicationUser;
  loading: boolean;

  constructor(private applicationUserService: ApplicationUserService) {}

  ngOnInit() {
    this.getApplicationUsers();
  }

  getApplicationUsers(): void {
    this.loading = true;
    this.applicationUserService.getApplicationUsers().subscribe(
      (applicationUsers: ApplicationUser[]) => this.applicationUsers = applicationUsers,
      null,
      () => this.loading = false
    );
  }

  buttonIsDisabled(): boolean {
    return !this.selectedApplicationUser;
  }

  selectSpecializations(selected: ApplicationUser): void {
    this.selectedApplicationUser = selected;
  }

  updateDatatable(): void {
    this.getApplicationUsers();
  }
}
