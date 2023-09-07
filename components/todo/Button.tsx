import { memo, MouseEventHandler } from 'react';

export default memo(function Button({ text, onClick }:
  { text: string, onClick: MouseEventHandler }) {
  console.debug('Button render');
  return <button onClick={onClick}>
    {text}
  </button>;
});