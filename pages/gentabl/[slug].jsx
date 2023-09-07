import { useRouter } from 'next/router';
import GenTable from '@/components/gen-json-sources/GenTable';
import GenFetcher from '@/components/gen-json-sources/GenFetcher';
import { columns } from '@/components/gen-json-sources/rnm';
import { columns as jsphC, fetcher as jsphF } from '@/components/gen-json-sources/jsph/';
import { columns as rnmC, fetcher as rnmF } from '@/components/gen-json-sources/rnm/';

export default function GtPage() {
  const
    router = useRouter(),
    { query: { slug } } = router,
    { fetcher , columns  } = ({
      jsph: { fetcher: jsphF, columns: jsphC },
      rnm: { fetcher: rnmF, columns: rnmC }
    })[slug];

  if (fetcher && columns)
    return <GenFetcher key={slug} fetcher={fetcher} columns={columns} />;



}