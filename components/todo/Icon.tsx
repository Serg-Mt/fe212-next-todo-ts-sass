import { memo } from 'react';

export default memo(function Icon({ type, children }: {
  type : string
  children: any
}) {
  console.debug('Icon render');
  return <button icon-type={type}>
    {children}
  </button>;
});