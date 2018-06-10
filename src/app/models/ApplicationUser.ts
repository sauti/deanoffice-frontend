import {BaseEntity} from './basemodels/BaseEntity';

export class ApplicationUser extends BaseEntity {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  facultyId: number;
}
