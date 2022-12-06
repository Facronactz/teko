export default function DefaultHead({ title }) {
  return (
    <>
      <title>{title ?? 'Teko'}</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Teman Komunitas - Penghubung Komunitas dengan Masyarakat" />
      <link rel="shortcut icon" href="/favicon.ico" />
    </>
  );
}
