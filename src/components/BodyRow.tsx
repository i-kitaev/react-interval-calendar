import React, { useMemo, useRef, useEffect, memo } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { getCellAttributes } from '../helpers';
import { VisibilityMatrix, SlotRefComponentProps } from '../types';
import BodyCell, { BodyCellSlotProps } from './BodyCell';
import { BodyCellContentSlotProps } from './BodyCellContent';

export interface BodyRowPropsOverrides {}
export type BodyRowProps = SlotRefComponentProps<'ul', BodyRowPropsOverrides>;
export type BodyRowSlotProps = BodyRowProps;

export type BodyRowPrivateProps = {
  numberOfWeek: number;
  numberOfTodayWeek: number;
  startRenderOnCurrentWeek: boolean;
  locale: string;
  numberOfRowsPreRender: number;
  startDate: Date | null;
  updateVisibilityMatrix?: (week: number) => void;
  visibilityMatrix: VisibilityMatrix;
  slots?: {
    root?: React.ElementType;
    cell?: React.ElementType;
    cellContent?: React.ElementType;
  };
  slotProps?: {
    root?: BodyRowSlotProps;
    cell?: BodyCellSlotProps;
    cellContent?: BodyCellContentSlotProps;
  };
};

const BodyRow = memo(
  ({
    numberOfWeek,
    numberOfTodayWeek,
    startRenderOnCurrentWeek,
    startDate,
    locale,
    visibilityMatrix,
    updateVisibilityMatrix,
    numberOfRowsPreRender,
    slots,
    slotProps,
  }: BodyRowPrivateProps): JSX.Element => {
    const ref = useRef<HTMLUListElement>(null);
    const shouldScroll = useRef<boolean>(startRenderOnCurrentWeek && numberOfWeek === numberOfTodayWeek);
    const isVisible = useOnScreen(ref);
    const shouldRender = useMemo(
      () =>
        visibilityMatrix[numberOfWeek] ||
        Array(numberOfRowsPreRender)
          .fill(null)
          .some((_, idx) => visibilityMatrix[numberOfWeek - idx]),
      [visibilityMatrix, numberOfWeek, numberOfRowsPreRender],
    );
    const data = useMemo(() => {
      if (!startDate) return [];

      return Array.from(Array(7).keys()).map(day => getCellAttributes(startDate, numberOfWeek, day, locale));
    }, [startDate, numberOfWeek, locale]);
    const RootSlot = useMemo(() => slots?.root || 'ul', [slots]);
    const rootProps = useMemo(() => ({ ...(slotProps?.root || {}) }), [slotProps?.root]);

    useEffect(() => {
      if (isVisible && !shouldRender && updateVisibilityMatrix) updateVisibilityMatrix(numberOfWeek);
    }, [isVisible, shouldRender, updateVisibilityMatrix, numberOfWeek]);

    useEffect(() => {
      if (ref.current && shouldScroll.current) ref.current.scrollIntoView({ block: 'center' });
    }, []);

    return (
      <RootSlot ref={ref} key={numberOfWeek} {...rootProps} cells={data}>
        {(shouldRender ? data : []).map(cell => (
          <BodyCell
            key={cell.key}
            data={cell}
            locale={locale}
            slots={{ root: slots?.cell, content: slots?.cellContent }}
            slotProps={{ root: slotProps?.cell, content: slotProps?.cellContent }}
          />
        ))}
      </RootSlot>
    );
  },
);

export default BodyRow;
