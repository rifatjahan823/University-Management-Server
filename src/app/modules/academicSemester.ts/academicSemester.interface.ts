export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type Title = 'Autumn' | 'Summer' | 'Fall';

export type Code = '01' | '02' | '03';

export type IAcademicSemester = {
  title: Title;
  year: string;
  code: Code;
  startMonth: Month;
  endMonth: Month;
};

export type IAcademicSearchTerm = {
  searchTerm: string;
};
