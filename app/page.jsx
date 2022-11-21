'use client';

import Image from 'next/image';
import { use } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import { Col } from 'react-bootstrap';
import hero from '../public/image/hero.png';
import teman from '../public/image/teman.png';

import CustomNavbar from '../components/navbar';

const getData = async (q) => {
  const res = await fetch(`http://localhost:3000/api/data?q=${q}`);
  const data = await res.json();
  return data;
};

function BasicExample() {
  const stats = use(getData('stats'));
  const team = use(getData('team'));

  return (
    <>
      <header>
        <CustomNavbar current='Beranda'></CustomNavbar>
        <section className="relative">
          <h1 className="font-extrabold text-base text-left w-1/3 absolute bottom-[14%] left-[8%] text-brand xs:text-xl sm:text-2xl md:text-5xl xxl:text-7xl">
            Bersama Membangun Negeri
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
                Ada apa aja sih?
              </h1>
              <p className="text-sm text-white xs:text-base lg:text-xl xxl:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                eum?
              </p>
            </div>
          </div>
          <Container fluid className="text-center">
            <div className="mt-[-60vmin] flex flex-md-row flex-wrap justify-center xs:mt-[-40vmin] s:mt-[-25vmin] sm:mt-[-20vmin]">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="rounded-md relative z-30 bg-white w-28 mt-8 p-[3vmin] mx-auto shadow-lg sm:w-32 md:w-40 lg:w-52 xl:w-64 xxl:w-80 lg:p-[5vmin] xl:p-[6vmin] "
                >
                  <h1 className="m-0 p-0 text-3xl text-brand xxl:text-4xl">
                    {stat.value}
                  </h1>
                  <p className="m-0 p-0 text-brand xxl:text-2xl">{stat.name}</p>
                </div>
              ))}
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi vitae, tenetur quidem eum aliquid vel labore sint
                  placeat ad deserunt consectetur fugit ullam. Eius unde neque
                  ducimus obcaecati ipsum quos vero totam recusandae hic
                  expedita nemo sit, illum harum. Quisquam impedit ullam itaque
                  facere et ad molestiae quod reprehenderit excepturi!{' '}
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
            <h2 className="text-2xl xs:text-3xl md:text-4xl">Mari,</h2>
            <p className="text-xl xs:text-2xl md:text-3xl">
              bersama membantu, karna
              <br />
              <q className="bg-brand text-white text-xxl font-bold p-1.5">
                Kita itu Penting
              </q>
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-brand text-white pt-5 pb-4">
        <Container className="text-left">
          <Row className="text-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="uppercase mb-4 font-semibold text-xl sm:text-2xl md:font-bold md:text-3xl">
                Teko
              </h5>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, ital consectetur lorem
                ipsum dolor sit amet adipisicing elit.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="uppercase mb-6 font-semibold md:text-xl">Pitur</h5>
              <p className="sm:mb-1">
                <a href="#" className="text-white  ">
                  {' '}
                  TheProviders
                </a>
              </p>
              <p className="sm:mb-1">
                <a href="#" className="text-white ">
                  {' '}
                  Creativity
                </a>
              </p>
              <p className="sm:mb-1">
                <a href="#" className="text-white ">
                  {' '}
                  SourceFiles
                </a>
              </p>
              <p className="sm:mb-1">
                <a href="#" className="text-white ">
                  {' '}
                  bootstrap 5 alpha
                </a>
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="uppercase mb-6 font-semibold md:text-xl">
                Kontak
              </h5>
              {team.members.map((member) => (
                <p key={member.name} className="sm:mb-1">
                  <a href="#" className="text-white ">
                    {' '}
                    {member.name}
                  </a>
                </p>
              ))}
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="uppercase mb-6 font-semibold md:text-xl">
                Alamat
              </h5>
              <p className="sm:mb-1">New York, NY 2333, US</p>
              <p className="sm:mb-1">theproviders98@gmail.com</p>
              <p className="sm:mb-1">+92 3162859445</p>
              <p className="sm:mb-1">+01 335 633 77</p>
            </div>
          </Row>
          <hr className="my-3" />
          <div className="text-center">
            <p> Copyright ©2022 All rights reserved | Teko</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default BasicExample;
