import { memo } from 'react';

export default memo(function Button({ text, onClick }) {
  console.debug('Button render');
  return <button onClick={onClick}>
    {text}
  </button>;
});