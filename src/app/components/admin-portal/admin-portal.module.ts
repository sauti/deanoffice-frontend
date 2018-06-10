import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminPortalComponent} from './admin-portal.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationModule} from '../login/authentication.module';
import {ApplicationUserTableComponent} from './application-user-table/application-user-table.component';
import {ApplicationUserModalComponent} from './application-user-modal/application-user-modal.component';
import {CreateApplicationUserComponent} from './create-application-user/create-application-user.component';
import {ApplicationUserFormComponent} from './application-user-form/application-user-form.component';
import {UpdateApplicationUserComponent} from './update-application-user/update-application-user.component';
import {DeleteApplicationUserComponent} from './delete-application-user/delete-application-user.component';

export const adminPortalRoutes: Routes = [
  {path: '', component: AdminPortalComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule.forRoot(),
    RouterModule.forChild(adminPortalRoutes)
  ],
  declarations: [
    AdminPortalComponent,
    ApplicationUserTableComponent,
    CreateApplicationUserComponent,
    ApplicationUserModalComponent,
    ApplicationUserFormComponent,
    UpdateApplicationUserComponent,
    DeleteApplicationUserComponent
  ],
  providers: [
    AuthenticationModule.tokenInterceptor()
  ]
})
export class AdminPortalModule {}
