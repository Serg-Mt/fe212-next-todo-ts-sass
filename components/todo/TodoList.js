import { useState, useCallback } from 'react';
import Form from './Form';
import List from './List';
import { newItem } from './item-type';

export default function TodoList({ startList = [] }) {
  const
    [list, setList] = useState(startList),
    addClick = useCallback(newItemText => setList(old => old.concat(newItem(newItemText))), []),
    changeCheckedItem = useCallback(id => setList(old => {
      const
        index = old.findIndex(el => id === el.id),
        {...item} = old[index];
      item.checked = !item.checked;
      return old.with(index, item);
    }), []),
    delItem = useCallback(id=>setList(old => old.filter(item=>id !==item.id)),[]);
  console.debug('TodoList render');
  return <fieldset>
    <legend>TodoList</legend>
    <Form addClick={addClick} />
    <List list={list} changeCheckedItem={changeCheckedItem} delItem={delItem}/>
  </fieldset>;
}