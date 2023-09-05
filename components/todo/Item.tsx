import { memo, useCallback } from 'react';
import Icon from './Icon';
import { ListItemType, ByIdCallback } from './item-type';


export default memo(function Item({ item, changeCheckedItem, delItem }
  : {
    item: ListItemType,
    changeCheckedItem: ByIdCallback,
    delItem: ByIdCallback
  }) {
  const
    { id, checked, text } = item,
    onClick = useCallback(() => delItem(id), [delItem, id]);

  console.debug('Item render id=', id);
  return <li>
    <input type="checkbox" checked={checked} onChange={() => changeCheckedItem(id)} />
    {text}
    <Icon onClick={onClick}>❌</Icon>
  </li>;
});