// enum LessonType

export interface Lesson {
  orderNumber: number;
  room: string;
  isSubstitution: boolean;
  group: string;
  subject: string;
  type: keyof LessonType; // ???
}

export interface WorkingDay {
  date: Date;
  lessons: Lesson[];
}

export interface Timetable {
  teacher: string;
  sdate: Date;
  edate: Date;
  workingDays: WorkingDay[];
}
