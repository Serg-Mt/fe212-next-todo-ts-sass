import { memo } from 'react';
import Icon from './Icon';
import { ListItemType, ByIdCallback } from './item-type';


export default memo(function Item({ item, changeCheckedItem }
  : {
    item: ListItemType,
    changeCheckedItem: ByIdCallback
  }) {
  const
    { id, checked, text } = item;

  console.debug('Item render id=', id);
  return <li data-todo-id={id}>
    <input type="checkbox" checked={checked} onChange={() => changeCheckedItem(id)} />
    {text}
    <Icon type='delete'>❌</Icon>
  </li>;
});