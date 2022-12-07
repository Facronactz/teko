import Fetcher from '@teko/helpers/fetcher';
import List from './list';
import Edit from './edit';
import New from './new';

export default function Page({ params }) {
  const fetcher = new Fetcher({
    id: params.id,
    url: 'teman',
  });

  return (
    <List fetcher={fetcher} />
  );
}
