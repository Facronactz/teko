export default function Component() {
  return (
    <span> Server Component </span>
  );
}

// eslint-disable-next-line camelcase
// import { unstable_getServerSession } from 'next-auth/next';

// export default async function Page() {
//   const session = await unstable_getServerSession();
//   if (session) {
//     return (
//       <>
//         {/* <pre>{JSON.stringify(session, null, 2)}</pre>; */}
//         {/* Signed in as {session.user.email} <br /> */}
//       </>
//     );
//   }
// }
