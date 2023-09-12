import  {gentable}  from './GenTable.module.sass';

export default function GenTable({ data, columns }) {
  // console.log('style=', style);
  return <table className={gentable}>
    <thead>
      <tr>
        {columns.map(({ title }) => <th key={title}>{title}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map(obj => <tr key={obj.id}>
        {columns.map(({ title, getVal }) => <td key={title}>{getVal(obj)}</td>)}
      </tr>)}
    </tbody>
  </table>;
}