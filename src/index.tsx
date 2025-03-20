import React, { useCallback, useMemo, useState, memo } from 'react';
import { getCalendarBaseAttributes } from './helpers';
import { CalendarTuple, VisibilityMatrix, WeekdayIndex, HeaderCellData, BodyCellData } from './types';
import Container, { ContainerProps, ContainerSlotProps, ContainerPropsOverrides } from './components/Container';
import Header, {
  HeaderProps,
  HeaderPropsOverrides,
  HeaderSlotProps,
  HeaderCellProps,
  HeaderCellPropsOverrides,
  HeaderCellSlotProps,
  HeaderCellContentProps,
  HeaderCellContentPropsOverrides,
  HeaderCellContentSlotProps,
} from './components/Header';
import Body, { BodyProps, BodySlotProps, BodyPropsOverrides } from './components/Body';
import { BodyRowProps, BodyRowSlotProps, BodyRowPropsOverrides } from './components/BodyRow';
import { BodyCellProps, BodyCellSlotProps, BodyCellPropsOverrides } from './components/BodyCell';
import { BodyCellContentProps, BodyCellContentSlotProps, BodyCellContentPropsOverrides } from './components/BodyCellContent';
import Empty, { EmptyProps, EmptySlotProps, EmptyPropsOverrides } from './components/Empty';

// Export the override props
export type {
  ContainerPropsOverrides,
  HeaderPropsOverrides,
  HeaderCellPropsOverrides,
  HeaderCellContentPropsOverrides,
  BodyPropsOverrides,
  BodyRowPropsOverrides,
  BodyCellPropsOverrides,
  BodyCellContentPropsOverrides,
  EmptyPropsOverrides,
};
// Export the normal props
export type {
  ContainerProps,
  HeaderProps,
  HeaderCellProps,
  HeaderCellContentProps,
  BodyProps,
  BodyRowProps,
  BodyCellProps,
  BodyCellContentProps,
  HeaderCellData,
  BodyCellData,
  EmptyProps,
};

type Slots = {
  root?: React.ElementType;
  header?: React.ElementType;
  headerCell?: React.ElementType;
  headerCellContent?: React.ElementType;
  body?: React.ElementType;
  bodyRow?: React.ElementType;
  bodyCell?: React.ElementType;
  bodyCellContent?: React.ElementType;
  empty?: React.ElementType;
};

type SlotProps = {
  root?: ContainerSlotProps;
  header?: HeaderSlotProps;
  headerCell?: HeaderCellSlotProps;
  headerCellContent?: HeaderCellContentSlotProps;
  body?: BodySlotProps;
  bodyRow?: BodyRowSlotProps;
  bodyCell?: BodyCellSlotProps;
  bodyCellContent?: BodyCellContentSlotProps;
  empty?: EmptySlotProps;
};

export type IntervalCalendarProps = {
  start?: Date;
  end?: Date;
  scrollTo?: Date;
  locale?: string;
  numberOfRowsFirstRender?: number;
  numberOfRowsPreRender?: number;
  startRenderOnCurrentWeek?: boolean;
  weekStartsOn?: WeekdayIndex;
  slots?: Slots;
  slotProps?: SlotProps;
};

const IntervalCalendar = memo(
  ({
    start = undefined,
    end = undefined,
    scrollTo = undefined,
    locale = 'default',
    numberOfRowsFirstRender = 8,
    numberOfRowsPreRender = 4,
    startRenderOnCurrentWeek = false,
    weekStartsOn = 0,
    slots,
    slotProps,
  }: IntervalCalendarProps): JSX.Element => {
    const startRenderOnScrollTo = startRenderOnCurrentWeek || !!scrollTo;

    const [startDate, , numberOfWeeks, numberOfScrollToWeek] = useMemo<CalendarTuple>(
      () => getCalendarBaseAttributes(start, end, scrollTo, weekStartsOn),
      [start, end, scrollTo, weekStartsOn],
    );

    const [visibilityMatrix, setVisibilityMatrix] = useState<VisibilityMatrix>(
      Array(startRenderOnScrollTo ? numberOfScrollToWeek + numberOfRowsFirstRender : numberOfRowsFirstRender)
        .fill(null)
        .reduce(
          (acc: VisibilityMatrix, _, week) => ({ ...acc, [week]: startRenderOnScrollTo ? !(week < numberOfScrollToWeek - Math.ceil(numberOfRowsFirstRender / 2)) : true }),
          {},
        ),
    );

    const handleVisibilityMatrixChange = useCallback(
      (week: number) => {
        setVisibilityMatrix(prevState => ({
          ...prevState,
          [week]: true,
        }));
      },
      [setVisibilityMatrix],
    );

    return (
      <Container slots={{ root: slots?.root }} slotProps={{ root: slotProps?.root }}>
        <Header
          weekStartsOn={weekStartsOn}
          locale={locale}
          slots={{ root: slots?.header, cell: slots?.headerCell, cellContent: slots?.headerCellContent }}
          slotProps={{ root: slotProps?.header, cell: slotProps?.headerCell, cellContent: slotProps?.headerCellContent }}
        />
        {!!numberOfWeeks && !!startDate ? (
          <Body
            startDate={startDate}
            numberOfWeeks={numberOfWeeks}
            numberOfTodayWeek={numberOfScrollToWeek}
            startRenderOnCurrentWeek={startRenderOnScrollTo}
            locale={locale}
            visibilityMatrix={visibilityMatrix}
            updateVisibilityMatrix={handleVisibilityMatrixChange}
            numberOfRowsPreRender={numberOfRowsPreRender}
            slots={{ root: slots?.body, row: slots?.bodyRow, cell: slots?.bodyCell, cellContent: slots?.bodyCellContent }}
            slotProps={{ root: slotProps?.body, row: slotProps?.bodyRow, cell: slotProps?.bodyCell, cellContent: slotProps?.bodyCellContent }}
          />
        ) : (
          <Empty slots={{ root: slots?.empty }} slotProps={{ root: slotProps?.empty }} />
        )}
      </Container>
    );
  },
);

export default IntervalCalendar;
