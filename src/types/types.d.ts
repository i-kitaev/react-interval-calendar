type WeeksHeight = number | '100%' | 'auto' | string;

type WeekdayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type HighlightedItem = {
  id?: number | string;
  key?: nnumber | string;
  start: Date;
  end: Date;
  color: string;
};

type VisibilityMatrix = {
  [week: number]: boolean;
};

type ThemeOption = 'light' | 'dark';

type CalendarTuple = [Date?, Date?, number];

type HeaderWeekday = {
  key: number;
  label: string;
};

type ClassNamesObject = {
  [string]: boolean;
};

type ClassNames = string | string[] | ClassNamesObject | ClassNamesObject[] | null | undefined;

type ClassNamesProp = string | string[];

type CustomClassNames = {
  calendar?: ClassNamesProp;
  calendarEmpty?: ClassNamesProp;
  header?: ClassNamesProp;
  headerDay?: ClassNamesProp;
  weeks?: ClassNamesProp;
  week?: ClassNamesProp;
  day?: ClassNamesProp;
  dayText?: ClassNamesProp;
  dayMonthText?: ClassNamesProp;
  dayYearText?: ClassNamesProp;
  dayHighlighted?: ClassNamesProp;
  daySelected?: ClassNamesProp;
  dayToday?: ClassNamesProp;
};

type ContextType = {
  startDate?: Date;
  numberOfWeeks: number;
  theme: ThemeOption;
  showHeaderWeekdays: boolean;
  showToday: boolean;
  showMonths: boolean;
  showYears: boolean;
  showGutterBetweenHighlighted: boolean;
  showMonthStripes: boolean;
  weekStartsOn: WeekdayIndex;
  fadeWeekends: boolean;
  weeksHeight: WeeksHeight;
  highlighted: HighlightedItem[];
  highlightedColorAlpha: number;
  locale: string;
  emptyLabel?: string;
  handleSelect?: (day: Day, resetFunction: () => void) => void;
  visibilityMatrix: VisibilityMatrix;
  updateVisibilityMatrix: (week: number) => void;
  numberOfWeekPreRender: number;
  customClassNames: CustomClassNames;
};
