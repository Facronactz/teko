'use client';

import Image from 'next/image';
import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';

// eslint-disable-next-line object-curly-newline
import { Container, Row, Card, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

import TekoNavbar from '@teko/components/navbar';
import TekoFooter from '@teko/components/footer';

import hero from '@teko/public/image/hero.png';
import teman from '@teko/public/image/teman.png';

// TODO: fetch data from API
const statsFetcher = new Fetcher({ url: 'data?q=stats' });
function Stats() {
  const { data, error } = useSWR(
    statsFetcher.url,
    statsFetcher.fetcher,
    statsFetcher.swrConfig
  );
  if (error) return <div>Gagal untuk memuat</div>;
  if (!data) {
    return (
      <Skeleton
        className="rounded-md z-30 bg-white w-28 mt-8 p-[3vmin] mx-auto shadow-lg sm:w-32 md:w-40 lg:w-52 xl:w-64 xxl:w-80 lg:p-[5vmin] xl:p-[6vmin]"
        containerClassName="flex-grow: 1; flex-direction: row"
        count={4}
      />
    );
  }
  return data.map((stat) => (
    <div
      key={stat.name}
      className="rounded-md relative z-30 bg-white w-28 mt-8 p-[3vmin] mx-auto shadow-lg sm:w-32 md:w-40 lg:w-52 xl:w-64 xxl:w-80 lg:p-[5vmin] xl:p-[6vmin] "
    >
      <h1 className="m-0 p-0 text-3xl text-brand xxl:text-4xl">{stat.value}</h1>
      <p className="m-0 p-0 text-brand xxl:text-2xl">{stat.name}</p>
    </div>
  ));
}

function BerandaPage() {
  return (
    <>
      {/* TODO pindah navbar ke layout dan ganti nama jadi TekoNavbar */}
      <TekoNavbar current="Beranda"></TekoNavbar>
      <header>
        <section className="relative">
          <h1 className="font-extrabold text-base text-left w-1/3 absolute bottom-[14%] left-[8%] text-brand xs:text-xl sm:text-2xl md:text-5xl xxl:text-7xl">
            Bersama Kita Membangun Negeri
          </h1>
          <Image className="w-full" src={hero} alt="gambar hero" />
        </section>
      </header>

      <main>
        <Container fluid className="p-0">
          <div className="w-full h-[110vmin] relative xs:h-[80vmin] s:h-[60vmin] sm:h-[55vmin]">
            <div className="absolute w-full h-full"></div>
            <div className="w-full h-full bg-brand pt-[19vmin] text-center">
              <h1 className="mb-2 text-3xl text-white lg:text-4xl xxl:text-5xl">
                Ada berapa sih TEMAN Kami?
              </h1>
              <p className="text-sm text-white xs:text-base lg:text-xl xxl:text-2xl">
                Kami selalu menghadirkan layanan yang menarik yang dapat
                membantu TEMAN kami <br></br> demi keberhasilan kegiatan yang
                diselenggarakan oleh komunitas untuk masyarakat
              </p>
            </div>
          </div>
          <Container fluid className="text-center">
            <div className="mt-[-60vmin] flex flex-md-row flex-wrap justify-center xs:mt-[-40vmin] s:mt-[-25vmin] sm:mt-[-20vmin]">
              <Stats />
            </div>
          </Container>
        </Container>

        <section className="flex my-4">
          <div className="mx-auto">
            <div className="flex flex-col items-center min-w-[320px] mx-auto lg:flex-row">
              <section className="w-full text-center text-sm m-2 p-3 lg:w-fit">
                <h1 className="text-brand font-extrabold m-1 text-xl md:text-2xl lg:text-3xl  lg:text-right xl:text-6xl">
                  Teman Kita
                </h1>
                <p className="m-1 md:text-base lg:text-xl lg:text-right xl:text-3xl">
                  {' '}
                  Adalah suatu sebutan untuk kami terhadap komunitas yang
                  menjalankan kegiatannya untuk mengabdi kepada masyarakat.
                  Tentunya banyak sekali Teman Kita yang sudah membantu dan
                  terdaftar dalam web kami{' '}
                  <span className="font-extrabold">Lihat Teman</span>
                </p>
              </section>
              <div className="w-full flex justify-center">
                <Image
                  className="w-3/5 lg:w-fit "
                  src={teman}
                  alt="foto about"
                />
              </div>
            </div>
          </div>
        </section>
        <section>
          {/* TODO buat ini sebagai komponen dinamis */}
          <Container className="grid p-0">
            <Row className=" grid m-4 gap-4 s:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Col className="p-0" key={item}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/200"
                      width="200"
                      height="200"
                      alt="..."
                    />
                    <Card.Body>
                      <Card.Title>Nama </Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        <section className="flex justify-center my-5">
          <div className="mx-auto">
            <h2 className="text-2xl xs:text-3xl md:text-4xl">Mari kita,</h2>
            <p className="text-xl xs:text-2xl md:text-3xl">
              bersama membantu, untuk
              <br />
              <q className="bg-brand text-white text-xxl font-bold p-1.5">
                Indonesia yang lebih baik!
              </q>
            </p>
          </div>
        </section>

        {/* untuk about us ( team ) */}
        {/* <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <img class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p class="text-lg font-medium">
              “Tailwind CSS is the only framework that I've seen scale
              on large teams. It’s easy to customize, adapts to any design,
              and the build size is tiny.”
            </p>
          </blockquote>
          <figcaption class="font-medium">
            <div class="text-sky-500 dark:text-sky-400">
              Sarah Dayan
            </div>
            <div class="text-slate-700 dark:text-slate-500">
              Staff Engineer, Algolia
            </div>
          </figcaption>
        </div>
      </figure> */}
      </main>

      {/* Pindah footer ke layout dan ganti nama jadi TekoFooter */}
      <TekoFooter></TekoFooter>
    </>
  );
}

export default BerandaPage;
