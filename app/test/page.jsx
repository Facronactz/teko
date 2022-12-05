'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
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
