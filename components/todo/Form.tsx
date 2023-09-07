import { memo, useState, useCallback, useRef } from 'react';
import Button from './Button';

export default memo(function Form({ addClick }:
  { addClick: (_: string) => void }) {
  const
    [value, setValue] = useState('-start-'),
    textRef = useRef(''),
    onClick = useCallback(() => addClick(textRef.current), [addClick]);

  textRef.current = value;

  console.debug('Form render');
  return <fieldset>
    <legend>Form</legend>
    <input value={value} onInput={evt => setValue(evt.currentTarget.value)} />
    <Button text="Add" onClick={onClick} />
  </fieldset>;
});