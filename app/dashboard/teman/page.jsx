// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth/next';

export default async function DashboardTeman() {
  const session = await unstable_getServerSession();
  // return <>ini Halaman Dashboard Teman</>;
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
