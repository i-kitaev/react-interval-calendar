import React, { memo } from 'react';
import { SlotComponentProps } from '../types';

export interface ContainerPropsOverrides {}
export type ContainerProps = SlotComponentProps<'div', ContainerPropsOverrides>;
export type ContainerSlotProps = ContainerProps;

export type ContainerPrivateProps = {
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: ContainerSlotProps;
  };
  children?: React.ReactNode;
};

const Container = memo(({ children, slots, slotProps }: ContainerPrivateProps): JSX.Element => {
  const containerProps = { ...(slotProps?.root || {}) };
  const ContainerSlot = slots?.root || 'div';

  return <ContainerSlot {...containerProps}>{children}</ContainerSlot>;
});

export default Container;
