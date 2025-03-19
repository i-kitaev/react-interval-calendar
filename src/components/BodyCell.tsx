import React, { useCallback, useMemo, memo } from 'react';
import { BodyCellData } from '../types';
import BodyCellContent, { BodyCellContentSlotProps } from './BodyCellContent';

type RefWithOnClick = Omit<Partial<React.ComponentPropsWithRef<'li'>>, 'onClick'> & {
  onClick?: (event: React.MouseEvent<HTMLLIElement>, data: BodyCellData) => void;
};

export interface BodyCellPropsOverrides {}
export type BodyCellProps = RefWithOnClick & BodyCellPropsOverrides;
export type BodyCellSlotProps = BodyCellProps;

export type BodyCellPrivateProps = {
  data: BodyCellData;
  locale?: string;
  slots?: {
    root?: React.ElementType;
    content?: React.ElementType;
  };
  slotProps?: {
    root?: BodyCellSlotProps;
    content?: BodyCellContentSlotProps;
  };
};

const BodyCell = memo(({ data, locale, slots, slotProps }: BodyCellPrivateProps): JSX.Element => {
  const [RootSlot, ContentSlot] = useMemo(() => [slots?.root || 'li', slots?.content || BodyCellContent], [slots]);
  const { onClick, ...restRootProps } = slotProps?.root || {};
  const rootProps = useMemo(() => ({ ...restRootProps }), [restRootProps]);
  const contentProps = useMemo(() => ({ ...(slotProps?.content || {}) }), [slotProps]);

  const handleCellClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      if (onClick) onClick(event, data);
    },
    [onClick, data],
  );

  return (
    <RootSlot {...rootProps} onClick={(!!onClick && handleCellClick) || undefined} role="presentation">
      <ContentSlot {...contentProps} data={data} locale={locale} />
    </RootSlot>
  );
});

export default BodyCell;
