import { Code, Month, Title } from './academicSemester.interface';

export const titleArray: Title[] = ['Autumn', 'Summer', 'Fall'];
export const codeArray: Code[] = ['01', '02', '03'];
export const monthsArray: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicTitleCodemapping: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableField = ['title', 'year', 'code'];

export const filterAbleField = ['searchTerm', 'title', 'year', 'code'];
