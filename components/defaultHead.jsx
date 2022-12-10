export default function DefaultHead({ title }) {
  return (
    <>
      <title>{title ?? 'Teko'}</title>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="dicoding:email" content="f284x0682@dicoding.org"></meta>
      <meta name="description" content="Teman Komunitas - Penghubung Komunitas dengan Masyarakat" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#315343" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="apple-mobile-web-app-title" content="Teko" />
      <meta name="application-name" content="Teko" />
      <meta name="msapplication-TileColor" content="#315343" />
      <meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#315343" />

    </>
  );
}
