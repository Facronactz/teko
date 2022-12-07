import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

import TemanDetail from './detail';

export default function TemanPage({ params }) {
  return (
    <>
      <TekoNavbar current="Teman"></TekoNavbar>
      <TemanDetail id={params.id} />
      <TekoFooter></TekoFooter>
    </>
  );
}
