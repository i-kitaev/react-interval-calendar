import React, { memo } from 'react';
import { SlotComponentProps } from '../types';

export interface EmptyPropsOverrides {}
export type EmptyProps = SlotComponentProps<'div', EmptyPropsOverrides, { label?: string }>;
export type EmptySlotProps = EmptyProps;

export type EmptyPrivateProps = {
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: EmptySlotProps;
  };
};

const Empty = memo(({ slots, slotProps }: EmptyPrivateProps): JSX.Element => {
  const { label = 'There is no date range to display', ...restProps } = slotProps?.root || {};
  const rootProps = { ...restProps, ...(slots?.root ? { label } : {}) };
  const RootSlot = slots?.root || 'div';

  return (
    <RootSlot {...rootProps}>
      <p>{label}</p>
    </RootSlot>
  );
});

export default Empty;
