// eslint-disable-next-line camelcase
import { unstable_getServerSession } from 'next-auth/next';

// import Link from 'next/link';
// import Container from 'react-bootstrap/Container';

export default async function DashboardTeman() {
  const session = await unstable_getServerSession();
  // return <>ini Halaman Dashboard Teman</>;
  // return (
  //   <>
  //     <Container className="mb-3 text-center w-full m-0 p-0 md:w-52 bg-brand md:fixed h-full">
  //       <h1 className="text-white p-2 font-bold">Teko</h1>
  //       <h5 className="text-white p-2 font-bold">Dashborad Teman</h5>
  //       <hr className="text-white text-center" />
  //       <Link
  //         className="block text-white p-2 py-3 no-underline text-center float-none xs:float-left
  //         xs:ml-0 "
  //         href={'/'}
  //       >
  //         Profil
  //       </Link>
  //       <Link
  //         className="block text-white p-2 py-3 no-underline text-center float-none xs:float-left
  //         xs:ml-0 "
  //         href={'/'}
  //       >
  //         Kegiatan
  //       </Link>
  //       <Link
  //         className="block text-white p-2 py-3 no-underline text-center float-none xs:float-left
  //         xs:ml-0 "
  //         href={'/'}
  //       >
  //         Program Kerja
  //       </Link>
  //     </Container>
  //     <Container className="ml-0 md:mt-0 md:ml-52 md:p-4 h-full">
  //       <h2>Responsive Sidebar Example</h2>
  //       <p>
  //         This example use media queries to transform the sidebar to a top
  //         navigation bar when the screen size is 700px or less.
  //       </p>
  //       <p>
  //         We have also added a media query for screens that are 400px or less,
  //         which will vertically stack and center the navigation links.
  //       </p>
  //       <h3>Resize the browser window to see the effect.</h3>
  //     </Container>
  //   </>
  // );
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
