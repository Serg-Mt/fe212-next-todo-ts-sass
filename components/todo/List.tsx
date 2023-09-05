import Item from './Item';
import { ListType,ByIdCallback } from './item-type';

export default function List({ list, changeCheckedItem, delItem }: {
  list: ListType,
  changeCheckedItem: ByIdCallback,
  delItem: ByIdCallback
}) {
  console.debug('List render');
  return <fieldset>
    <legend>List</legend>
    <ol>
      {list.map(item => <Item key={item.id} item={item} changeCheckedItem={changeCheckedItem} delItem={delItem} />)}
    </ol>
  </fieldset>;
}