import { memo, useCallback } from 'react';
import Icon from './Icon';


export default memo(function Item({ item, changeCheckedItem, delItem }) {
  const
    { id, checked, text } = item,
    onClick = useCallback(() => delItem(id), [delItem, id]);

  console.debug('Item render id=', id);
  return <li title={id}>
    <input type="checkbox" checked={checked} onChange={() => changeCheckedItem(id)} />
    {text}
    <Icon onClick={onClick}>❌</Icon>
  </li>;
});