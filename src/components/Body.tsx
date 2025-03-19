import React, { memo, useMemo } from 'react';
import { SlotComponentProps, VisibilityMatrix } from '../types';
import BodyRow, { BodyRowSlotProps } from './BodyRow';
import { BodyCellSlotProps } from './BodyCell';
import { BodyCellContentSlotProps } from './BodyCellContent';

export interface BodyPropsOverrides {}
export type BodyProps = SlotComponentProps<'div', BodyPropsOverrides>;
export type BodySlotProps = BodyProps;

export type BodyPrivateProps = {
  numberOfWeeks: number;
  numberOfTodayWeek: number;
  startRenderOnCurrentWeek: boolean;
  locale: string;
  numberOfRowsPreRender: number;
  startDate: Date | null;
  updateVisibilityMatrix?: (week: number) => void;
  visibilityMatrix: VisibilityMatrix;
  slots?: {
    root?: React.ElementType;
    row?: React.ElementType;
    cell?: React.ElementType;
    cellContent?: React.ElementType;
  };
  slotProps?: {
    root?: BodySlotProps;
    row?: BodyRowSlotProps;
    cell?: BodyCellSlotProps;
    cellContent?: BodyCellContentSlotProps;
  };
};

const Body = memo(
  ({
    numberOfWeeks,
    numberOfTodayWeek,
    startRenderOnCurrentWeek,
    locale,
    numberOfRowsPreRender,
    startDate,
    updateVisibilityMatrix,
    visibilityMatrix,
    slots,
    slotProps,
  }: BodyPrivateProps): JSX.Element => {
    const RootSlot = useMemo(() => slots?.root || 'div', [slots]);
    const rootProps = useMemo(() => ({ ...(slotProps?.root || {}) }), [slotProps]);

    return (
      <RootSlot {...rootProps}>
        {!!startDate &&
          Array.from(Array(numberOfWeeks + 1).keys()).map(numberOfWeek => (
            <BodyRow
              key={numberOfWeek}
              numberOfWeek={numberOfWeek}
              numberOfTodayWeek={numberOfTodayWeek}
              startRenderOnCurrentWeek={startRenderOnCurrentWeek}
              locale={locale}
              numberOfRowsPreRender={numberOfRowsPreRender}
              startDate={startDate}
              updateVisibilityMatrix={updateVisibilityMatrix}
              visibilityMatrix={visibilityMatrix}
              slots={{
                root: slots?.row,
                cell: slots?.cell,
                cellContent: slots?.cellContent,
              }}
              slotProps={{
                root: slotProps?.row,
                cell: slotProps?.cell,
                cellContent: slotProps?.cellContent,
              }}
            />
          ))}
      </RootSlot>
    );
  },
);

export default Body;
