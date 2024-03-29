'use client';

import { Container, Row } from 'react-bootstrap';
import useSWR from 'swr';
import Fetcher from '@teko/helpers/fetcher';

const Team = () => {
  const teamsFetcher = new Fetcher('data?q=team');
  const { data, error } = useSWR(
    teamsFetcher.url,
    teamsFetcher.fetcher,
    teamsFetcher.swrConfig,
  );
  if (error) return <div>Gagal untuk memuat</div>;
  if (!data) return <div>Loading...</div>;
  return data.map((member) => (
    <p key={member.name} className="sm:mb-1">
      <a href={member.linkedin} className="text-white no-underline">
        {member.name}
      </a>
    </p>
  ));
};

function TekoFooter() {
  return (
    <>
      <footer className="bg-brand text-white pt-5 pb-2 no-underline mt-auto">
        <Container className="text-left">
          <Row className="text-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="uppercase mb-4 font-semibold text-xl sm:text-2xl md:font-bold md:text-3xl">
                Teko
              </h5>
              <p>
                Platform yang memberikan informasi mengenai organisasi yang
                bergerak di Indonesia untuk diketahui masyarakat luas.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="uppercase mb-6 font-semibold md:text-xl">Fitur</h5>
              <p className="sm:mb-1">
                <a href="/teman" className="text-white no-underline">
                  Teman
                </a>
              </p>
              <p className="sm:mb-1">
                <a href="/kegiatan" className="text-white no-underline">
                  Kegiatan
                </a>
              </p>
              <p className="sm:mb-1">
                <a href="/tentang-kami" className="text-white no-underline">
                  Tentang-kami
                </a>
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="uppercase mb-6 font-semibold md:text-xl">
                Kontak
              </h5>
              <Team />
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="uppercase mb-6 font-semibold md:text-xl">
                Alamat
              </h5>
              <p className="sm:mb-1">
                Desa Bojongmanggu, Kec. Pameungpeuk, Kab. Bandung, Jawa Barat
                40376
              </p>
            </div>
          </Row>
          <hr className="my-3" />
          <div className="text-center">
            <p className="m-1">
              Copyright ©2022 - Teko | Built for Educational Purposes Only
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default TekoFooter;
