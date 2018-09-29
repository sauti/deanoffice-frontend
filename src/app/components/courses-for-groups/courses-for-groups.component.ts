import {Component, OnInit, ViewChild} from '@angular/core';
import { StudentGroup } from '../../models/StudentGroup';
import { Course } from '../../models/Course';
import { GroupService } from '../../services/group.service';
import { CourseService } from '../../services/course.service';
import { CourseForGroup } from '../../models/CourseForGroup';
import { AddedCoursesComponent } from './added-courses/added-courses.component';
import { CourseForGroupService } from '../../services/course-for-group.service';
import { Teacher } from '../../models/Teacher';

@Component({
  selector: 'courses-for-groups',
  templateUrl: './courses-for-groups.component.html',
  styleUrls: ['./courses-for-groups.component.scss'],
  providers: [CourseService, GroupService]
})
export class CoursesForGroupsComponent implements OnInit {
  indexForTeacher: number;
  indexForDate: number;
  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  semesters: number[] = [];
  courses: Course[];
  coursesForAdd: CourseForGroup[] = [];
  coursesForDelete: CourseForGroup[] = [];
  updatedCourses: CourseForGroup[] = [];
  selectedCourses: Course[];
  searchText = '';
  coursesForGroup: CourseForGroup[] = [];
  deleteCoursesIds: number[] = [];
  @ViewChild(AddedCoursesComponent) child: AddedCoursesComponent;
  studiedCoursesLoading = false;
  showPage = false;
  showTeacherDialog = false;
  showCopyDialog = false;

  constructor(private courseService: CourseService,
    private courseForGroupService: CourseForGroupService,
    private groupService: GroupService) {}

  ngOnInit() {
    this.groupService.getGroupsByFaculty().subscribe(groups => {
      this.groups = groups;
      this.showPage = true;
    })
  }

  private changeSemesters() {
    this.semesters = [];
    for (let i = 0; i < this.selectedGroup.studySemesters; i++) {
      this.semesters.push(i + 1);
    }
  }

  onGroupChange() {
    this.changeSemesters();
    setTimeout(() => {
      if (this.selectedSemester) {
        this.child.getCoursesForGroup();
      }
    }, 0);
    this.coursesForDelete = [];
    this.child.coursesForGroupForDelete = [];
    this.deleteCoursesIds = [];
    this.coursesForAdd = [];
    this.updatedCourses = [];
    this.coursesForGroup = [];
  }

  onSemesterChange() {
    this.studiedCoursesLoading = true;
    if (this.selectedSemester) {
      this.courseService.getCoursesBySemester(this.selectedSemester).subscribe(cfg => {
        this.courses = cfg;
        this.studiedCoursesLoading = false;
      })
    }
    setTimeout(() => {
      this.child.getCoursesForGroup();
    }, 0);
  }

  changeCoursesForGroup(event) {
    for (let i = 0; i < event.length; i++) {
      this.coursesForGroup.push(event[i])
    }
  }

  changeCoursesForDelete(event) {
    this.coursesForDelete = event;
  }

  deleteCoursesFromCoursesForGroups() {
    for (const deletedCourse of this.coursesForDelete) {
      for (const course of this.coursesForGroup) {
        if (deletedCourse.course.id === course.course.id && deletedCourse.id) {
          this.coursesForGroup.splice(this.coursesForGroup.indexOf(course), 1);
          this.deleteCoursesIds.push(deletedCourse.id);
          this.updatedCourses.splice(this.updatedCourses.indexOf(course), 1);
          this.child.coursesForGroup.splice(this.child.coursesForGroup.indexOf(course), 1);
        }
        for (const addedCourse of this.coursesForAdd) {
          if (addedCourse.course.id === deletedCourse.course.id) {
            this.coursesForGroup.splice(this.coursesForGroup.indexOf(course), 1);
            this.coursesForAdd.splice(this.coursesForAdd.indexOf(addedCourse), 1);
            this.child.coursesForGroup.splice(this.child.coursesForGroup.indexOf(addedCourse), 1);
          }
        }
      }
    }
    this.child.coursesForGroupForDelete = [];
    this.coursesForDelete = [];
  }

  changeSelectedCourses(event) {
    this.selectedCourses = event;
  }

  addCoursesToCoursesForGroup() {
    if (this.selectedCourses) {
      for (const course of this.selectedCourses) {
        const courseForGroup = new CourseForGroup();
        const teacher = new Teacher();
        courseForGroup.course = course;
        courseForGroup.studentGroup = this.selectedGroup;
        courseForGroup.teacher = teacher;
        if (this.coursesForAdd) {
          let courseIsAdded = false;
          for (const courseForAdd of this.coursesForAdd) {
            if (courseForGroup.course.id === courseForAdd.course.id) {
              courseIsAdded = true;
            }
          }
          if (!courseIsAdded) {
            this.coursesForAdd.push(courseForGroup);
            this.coursesForGroup.push(courseForGroup);
          }
        } else {
          this.coursesForAdd.push(courseForGroup);
          this.coursesForGroup.push(courseForGroup);
        }
      }
    }
    this.showAddedCourses();
  }

  showAddedCourses() {
    setTimeout(() => {
      this.child.addNewCoursesForGroup();
    });
  }

  saveCoursesForGroup() {
    const newCourses: any[] = [];
    const updatedCourses: any[] = [];
    for (const newCourse of this.coursesForAdd) {
      newCourses.push({
        course: {
          id: newCourse.course.id
        },
        teacher: {
          id: newCourse.teacher.id
        },
        examDate: newCourse.examDate,
      })
    }
    for (const updateCourse of this.updatedCourses) {
      updatedCourses.push({
        id: updateCourse.id,
        course: {
          id: updateCourse.course.id
        },
        teacher: {
          id: updateCourse.teacher.id
        },
        examDate: updateCourse.examDate,
      })
    }
    this.courseForGroupService.createCoursesForGroup(this.selectedGroup.id, {
      newCourses: newCourses,
      updatedCourses: updatedCourses,
      deleteCoursesIds: this.deleteCoursesIds
    }).subscribe(() => {
      this.refresh();
    });
  }

  refresh() {
    this.coursesForDelete = [];
    this.child.coursesForGroupForDelete = [];
    this.deleteCoursesIds = [];
    this.coursesForAdd = [];
    this.updatedCourses = [];
    this.coursesForGroup = [];
    setTimeout(() => {
      this.onSemesterChange();
    }, 10);
  }

  onCourseCreation() {
    if (this.selectedSemester) {
      this.studiedCoursesLoading = true;
      this.courseService.getCoursesBySemester(this.selectedSemester).subscribe(cfg => {
        this.courses = cfg;
        this.studiedCoursesLoading = false;
      })
    }
  }

  changeTeacher(event) {
    let isAdded: boolean;
    isAdded = false;
    if (event.show) {
      this.showTeacherDialog = event.show;
      this.indexForTeacher = event.index;
    } else {
      for (const updatedCourse of event) {
        if (event.indexOf(updatedCourse) === this.indexForTeacher) {
          for (const addedCourse of this.coursesForAdd) {
            if (updatedCourse.course.id === addedCourse.course.id) {
              addedCourse.teacher = updatedCourse.teacher;
              isAdded = true;
            }
          }
          if (!isAdded) {
             this.updatedCourses.push(updatedCourse);
          }
        }
      }
    }
  }

  changeDate(event) {
    let isAdded: boolean;
    isAdded = false;
    this.indexForDate = event.index;
      for (const course of this.coursesForGroup) {
        if (this.coursesForGroup.indexOf(course) === this.indexForDate) {
          for (const addedCourse of this.coursesForAdd) {
            if (course.course.id === addedCourse.course.id) {
              addedCourse.examDate = course.examDate;
              isAdded = true;
            }
          }
          if (!isAdded) {
            if (course.teacher === undefined) {
              const teacher = new Teacher();
              course.teacher = teacher;
            }
            this.updatedCourses.push(course);
          }
        }
      }
  }
  copyCourses() {
    this.showCopyDialog = true;
  }
}
