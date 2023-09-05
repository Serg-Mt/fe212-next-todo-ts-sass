import { memo, MouseEventHandler } from 'react';

export default memo(function Icon({ onClick, children }: {
  onClick: MouseEventHandler,
  children: any
}) {
  console.debug('Icon render');
  return <button onClick={onClick}>
    {children}
  </button>;
});