import { useState } from 'react';
import GenTable from './GenTable';
import GenFetcher from './GenFetcher';


export default function GenFilterSortStore({ config: { fetcher, columns, infoFetcher, InfoComponent } }) {
  const
    [data, setData] = useState(null),
    [filterStr, setFilterStr] = useState(''),
    [paneInfoId, setPaneInfoId] = useState(null),
    [paneInfoData, setPaneInfoData] = useState(null),
    [panelSubQueryId, setPanelSubQueryId] = useState(null),
    [panelSubQueryData, setPanelSubQueryData] = useState(null),
    columnsWithButtons = columns.concat({
      title: 'actions', getVal: ({ id }) => <>
        <button data-id={id} data-action='info'>ℹ️</button>
        <button data-id={id} data-action='del'>❌</button>
      </>
    });

  function filterObjects(el) {
    if (!filterStr) return true;
    return columns.map(({ getVal }) => getVal(el)).filter(x => 'string' === typeof x).some(x => x.toLowerCase().includes(filterStr.toLowerCase()));
  }

  function onClick(evt) {
    const
      source = evt.target.closest('button[data-action][data-id]');
    // console.log('source=', source);
    if (!source) return;
    const { id, action } = source.dataset;
    // console.log({ id, action });
    switch (action) {
      case 'del':
        setData(old => old.filter(el => String(el.id) !== id));
        return;
      case 'info':
        setPaneInfoId(id);
        return;
    }
  }

  return <div onClick={onClick}>
    <input value={filterStr} onInput={evt => setFilterStr(evt.target.value)} />
    <GenFetcher fetcher={fetcher} onLoadCallback={setData}>
      <GenTable data={data?.filter(filterObjects)} columns={columnsWithButtons} />
    </GenFetcher>
    <hr />
    {paneInfoId &&
      <GenFetcher fetcher={() => infoFetcher(paneInfoId)} onLoadCallback={setPaneInfoData}>
        <InfoComponent data={paneInfoData}>
          <button>show posts</button>
        </InfoComponent>
      </GenFetcher>}
    <hr />

  </div>;

}