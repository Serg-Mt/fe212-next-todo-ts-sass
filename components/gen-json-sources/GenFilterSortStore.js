import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import GenFetcher from './GenFetcher';
import GenTable from './GenTable';
import useSWR from 'swr';


function Form({ columns, values, setValues }) {
  return <tr>
    {columns.map(({ title, setVal, getVal }, index) =>
      <td key={title}>
        {setVal
          ? <input value={values[index]} onInput={evt => setValues(old => old.with(index, evt.target.value))} />
          : '...'
        }
      </td>)}
    <td>
      <button data-id={''} data-action='ok'>🆗</button>
      <button data-id={''} data-action='cancel'>✖️</button>
    </td>
  </tr>;
}


export default function GenFilterSortStore({ config: { fetcher, columns, infoFetcher, InfoComponent, subQueryFetcher, SubQueryComponent, API } }) {
  const
    { data, error, isLoading, isValidating, mutate } = useSWR(API, fetcher),
    // [fetcherKey, setFetcherKey] = useState(1),
    // [data, setData] = useState(null),
    [filterStr, setFilterStr] = useState(''),
    [sortByColumnN, setSortByColumnN] = useState(null), // number
    [editetId, setEditetId] = useState(null),
    [paneInfoId, setPaneInfoId] = useState(null),
    [paneInfoData, setPaneInfoData] = useState(null),
    [panelSubQueryId, setPanelSubQueryId] = useState(null),
    [panelSubQueryData, setPanelSubQueryData] = useState(null),
    [values, setValues] = useState(columns.map(() => '-')),
    panelInfoFetcher = useCallback(() => infoFetcher(paneInfoId), [paneInfoId]),
    panelSubQueryFetcher = useCallback(() => subQueryFetcher(paneInfoId), [paneInfoId]),


    columnsWithButtons = columns.concat({
      title: 'actions', getVal: ({ id }) => <>
        <button data-id={id} data-action='info'>ℹ️</button>
        <button data-id={id} data-action='edit'>✏️</button>
        <button data-id={id} data-action='del'>❌</button>
      </>
    });



  function filterObjects(el) {
    if (!filterStr) return true;
    return columns.map(({ getVal }) => getVal(el)).filter(x => 'string' === typeof x).some(x => x.toLowerCase().includes(filterStr.toLowerCase()));
  }

  async function onClick(evt) {
    const
      source = evt.target.closest('button[data-action][data-id]');
    // console.log('source=', source);
    if (source) {
      const { id, action } = source.dataset;
      // console.log({ id, action });
      let optimisticData;
      const
        promise = (() => {
          switch (action) {
            case 'del':
              optimisticData = data.filter(el => String(el.id) !== id);
              return fetch(API + id, { method: 'DELETE' })
                .then(async res => {
                  if (!res.ok) {
                    throw (new Error(res.status + ' ' + res.statusText));
                  }
                });
            case 'ok':
              setEditetId(null);
              if (editetId) { // edit
                const
                  index = data.findIndex((obj) => String(obj.id) === String(editetId)),
                  newObj = { ...data[index] };
                columns.forEach(({ setVal }, i) => Object.assign(newObj, setVal?.(values[i])));
                optimisticData = data.with(index, newObj);
                setValues(columns.map(() => ''));
                return fetch(API + editetId,
                  {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newObj)
                  })
                  .then(async res => {
                    if (!res.ok) {
                      throw (new Error(res.status + ' ' + res.statusText));
                    }
                  });

                // eslint-disable-next-line no-else-return
              } else { // add
                const newObj = { id: Math.random(), address: {} };
                columns.forEach(({ setVal }, index) => Object.assign(newObj, setVal?.(values[index])));
                optimisticData = data.concat(newObj);
                setValues(columns.map(() => '+'));
                return fetch(API,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newObj)
                  })
                  .then(async res => {
                    if (!res.ok) {
                      throw (new Error(res.status + ' ' + res.statusText));
                    }
                  });

              }
          }
        })();
      if (promise) {
        toast.promise(promise, {
          loading: 'Fetching ' + action,
          success: 'ok',
          error: (err) => `${err.toString()}`,
        });
        await mutate(promise.then(fetcher, fetcher), { optimisticData, populateCache: true, revalidate: false });
      }
      switch (action) {
        // case 'del':
        //   setData(old => old.filter(el => String(el.id) !== id));
        //   // eslint-disable-next-line no-case-declarations
        //   const res = fetch(API + id + 100, {
        //     method: 'DELETE'
        //   }).then(async res => {
        //     if (!res.ok) {
        //       setData(await fetcher());
        //       throw (new Error(res.status + res.statusText));
        //     }
        //   });
        //   toast.promise(res, {
        //     loading: 'Deleting...',
        //     success: 'ok',
        //     error: (err) => `This just happened: ${err.toString()}`
        //   });
        //   // console.log('DELETE result', req, await req.text());
        //   return;
        case 'info':
          setPaneInfoId(id);
          setPanelSubQueryId(null);
          return;
        case 'subquery':
          setPanelSubQueryId(id);
          return;
        case 'edit':
          setEditetId(id);
          const index = data.findIndex((obj) => String(obj.id) === String(id));
          setValues(columns.map(({ setVal, getVal }) => setVal ? getVal(data[index]) : '-'));
          return;
        case 'cancel':
          setEditetId(null);
          setValues(columns.map(() => '_'));
          return;
        // case 'ok':
        //   if (editetId) { // edit
        //     const
        //       index = data.findIndex((obj) => String(obj.id) === String(editetId)),
        //       newObj = { ...data[index] };
        //     columns.forEach(({ setVal }, i) => Object.assign(newObj, setVal?.(values[i])));
        //     setData(old => old.with(index, newObj));
        //   } else { // add
        //     const newObj = { id: Math.random(), address: {} };
        //     columns.forEach(({ setVal }, index) => Object.assign(newObj, setVal?.(values[index])));
        //     setData(data.concat(newObj));
        //   }
        //   setEditetId(null);
        //   setValues(columns.map(() => '+'));
      }
      return; // ?????????????????
    }
    const
      th = evt.target.closest('thead th');
    if (th) {
      let newSortN;
      if (Math.abs(sortByColumnN) === 1 + th.cellIndex)
        newSortN = -sortByColumnN;
      else
        newSortN = 1 + th.cellIndex;
      const
        { getVal } = columns[Math.abs(newSortN) - 1],
        sorted = data.toSorted((a, b) => 'string' === typeof getVal(a) ? getVal(a).localeCompare(getVal(b)) : 1);
      if (newSortN < 0)
        sorted.reverse();
      setSortByColumnN(newSortN);
      setData(sorted);
    }
  }





  return <div onClick={onClick}>
    <input value={filterStr} onInput={evt => setFilterStr(evt.target.value)} />
    <div style={{ position: 'absolute', fontSize: 'xxx-large' }}>
      {isLoading && <>⌛</>}
      {isValidating && <>👁</>}
    </div>
    {error && <>Error {error.toString()}</>}
    {data && <GenTable data={data?.filter(filterObjects)} columns={columnsWithButtons} sortByColumnN={sortByColumnN} editetId={editetId}>
      <Form columns={columns} values={values} setValues={setValues} />
    </GenTable>}
    <hr />
    {paneInfoId &&
      <GenFetcher fetcher={panelInfoFetcher} onLoadCallback={setPaneInfoData}>
        <InfoComponent data={paneInfoData}>
          <button data-id={paneInfoId} data-action='subquery'>🌐SubQuery</button>
        </InfoComponent>
      </GenFetcher>}
    <hr />
    {panelSubQueryId &&
      <GenFetcher fetcher={panelSubQueryFetcher} onLoadCallback={setPanelSubQueryData}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {panelSubQueryData &&
            panelSubQueryData.map(item => <SubQueryComponent key={item.id} data={item} />)}
        </div>
      </GenFetcher>
    }
  </div>;

}