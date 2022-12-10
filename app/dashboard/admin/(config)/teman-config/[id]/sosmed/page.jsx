'use client';

import Fetcher from '@teko/helpers/fetcher';
import NewSosmed from './new';
import ListSosmed from './sosmed';

export default function New({ params }) {
  const sosmedFetcher = new Fetcher({
    url: `sosmed?lembaga=${params.id}`,
  });
  return (
    <>
      <table className="m-auto">
        <thead>
          <tr className="text-center">
            <th>platform</th>
            <th>nama</th>
            <th>url</th>
            <th>aksi</th>
          </tr>
        </thead>
        <tbody>
          <ListSosmed id={params.id} fetcher={sosmedFetcher} />
          <NewSosmed id={params.id} fetcher={sosmedFetcher} />
        </tbody>
      </table>
    </>
  );
}
