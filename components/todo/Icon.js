import { memo } from 'react';

export default memo(function Icon({ onClick, children }) {
  console.debug('Icon render');
  return <button onClick={onClick}>
    {children}
  </button>;
});