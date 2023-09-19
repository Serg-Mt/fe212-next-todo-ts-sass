import style from './GenTable.module.sass';

export default function GenTable({ data, columns, sortByColumnN, editetId, children }) {
  // console.log('style=', style);
  return <table className={style.gentable}>
    <thead>
      <tr>
        {columns.map(({ title }, index) =>
          <th
            key={title}
            className={[
              index === Math.abs(sortByColumnN) - 1 ? style.sort : '',
              index === Math.abs(sortByColumnN) - 1 && sortByColumnN < 0 ? style.desc : ''].join(' ')}
          >
            {title}
          </th>)}
      </tr>
    </thead>
    <tbody>
      {data.map(obj =>
        <>
          {String(obj.id) === String(editetId)
            ? <>{children}</>
            : <tr key={obj.id}>
              {columns.map(({ title, getVal }) => <td key={title}>{getVal(obj)}</td>)}
            </tr>}
        </>
      )}
    </tbody>
    <tfoot>
      {!editetId && <>{children}</>}
    </tfoot>
  </table>;
}