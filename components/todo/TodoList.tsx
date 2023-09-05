import { useState, useCallback } from 'react';
import Form from './Form';
import List from './List';
import { newItem, ListType, ByIdCallback } from './item-type';

export default function TodoList({ startList = [] }: { startList: ListType }) {
  const
    [list, setList] = useState(startList),
    addClick = useCallback((newItemText: string) => setList(old => old.concat(newItem(newItemText))), []),
    changeCheckedItem: ByIdCallback = useCallback(id => setList(old => {
      const
        index = old.findIndex(el => id === el.id),
        { ...item } = old[index];
      item.checked = !item.checked;
      // @ts-ignore
      return old.with(index, item);
    }), []),
    delItem: ByIdCallback = useCallback(id => setList(old => old.filter(item => id !== item.id)), []);
  console.debug('TodoList render');
  return <fieldset>
    <legend>TodoList</legend>
    {/* @ts-ignore */}
    <Form addClick={addClick} />
    <List list={list} changeCheckedItem={changeCheckedItem} delItem={delItem} />
  </fieldset>;
}