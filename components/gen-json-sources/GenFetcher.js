import { useEffect } from 'react';
import { useState } from 'react';
import GenTable from './GenTable';

export default function GenFetcher({ fetcher, columns }) {
  const
    [data, setData] = useState(null),
    [error, setError] = useState(null);

  useEffect(() => {
    async function f() {
      try {
        setData(await fetcher());
        setError(null);
      } catch (err) {
        setError(err);
      }
    } f();
  }, [fetcher]);

  if (error) return <Error error={error} />;
  if (data) return <GenTable data={data} columns={columns} />;
  return <Spinner />;
}

function Error({ error }) {
  return <h2 style={{ color: 'red' }} >Error = {error.toString} </h2>;
}

function Spinner() {
  return <>loading...</>;
}