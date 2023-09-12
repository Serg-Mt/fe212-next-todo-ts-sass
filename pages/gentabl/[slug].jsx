import jsph from '@/components/gen-json-sources/jsph/';
import omdb from '@/components/gen-json-sources/omdb';
import rnm from '@/components/gen-json-sources/rnm/';
import { useRouter } from 'next/router';
import GenFilterSortStore from '@/components/gen-json-sources/GenFilterSortStore';

export default function GtPage() {
  const
    router = useRouter(),
    { query: { slug } } = router,
    config = ({ jsph, omdb, rnm })[slug];


  if (config)
    return <GenFilterSortStore key={slug} config={config} />;
  console.error(router);



}