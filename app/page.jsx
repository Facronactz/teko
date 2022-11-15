"use client";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import hero from "../public/image/hero.jpg";
import teman from "../public/image/teman.png";
import { Col } from "react-bootstrap";

const menus = [
  { name: "Beranda", href: "#", current: true },
  { name: "Teman", href: "#", current: false },
  { name: "Kegiatan", href: "#", current: false },
];

const stats = [
  { name: "Teman Kita", value: "1000" },
  { name: "Kegiatan", value: "101" },
  { name: "Relawan", value: "1052" },
  { name: "Pengabdian", value: "55" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BasicExample() {
  return (
    <>
      <header>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="transparent"
          variant="light"
          position="fixed"
          className="w-full z-50"
        >
          <Container fluid>
            <Navbar.Brand href="#">
              <h1 className="text-brand ml-2 text-2xl font-extrabold">Teko</h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="mx-auto">
                {menus.map((menu) => (
                  <Nav.Link
                    key={menu.name}
                    className={menu.current ? "mx-2 font-bold" : "mx-2"}
                    active
                    href={menu.href}
                  >
                    {menu.name}
                  </Nav.Link>
                ))}
              </Nav>
              <div className="flex flex-col md:flex-row">
                <button
                  id="signIn-button"
                  className="font-semibold text-brand px-4 py-2 border border-1 border-brand"
                >
                  Daftar
                </button>
                <button
                  id="logIn-button"
                  className="font-semibold text-white bg-brand px-4 py-2 outline-brand"
                >
                  Masuk
                </button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <section className="relative">
          <h1 className="font-extrabold	text-base	text-left	w-1/3	absolute bottom-1/3 left-[8%] text-brand md:text-6xl">
            Jadilah Teman Kami
          </h1>
          <Image className="w-full" src={hero} alt="gambar hero" />
        </section>
      </header>

      <main>
        <Container fluid className="p-0">
          <div className="w-full h-[110vmin] relative">
            <div className="absolute w-full h-full"></div>
            <div className="w-full h-full bg-brand pt-[19vmin] text-center">
              <h1 className="text-3xl text-white">Ada apa aja sih?</h1>
              <p className="text-sm text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
                eum?
              </p>
            </div>
          </div>
          <Container fluid className="text-center">
            <div className="mt-[-60vmin] flex flex-md-row flex-wrap justify-center">
              {stats.map((stat) => (
                <div key={stat.name} className="rounded-sm relative z-30 bg-white w-28 mt-8 p-[3vmin] mx-auto shadow-lg">
                  <h1 className="m-0 p-0 text-3xl text-brand">{stat.value}</h1>
                  <p className="m-0 p-0 text-brand">{stat.name}</p>
                </div>
              ))}
            </div>
          </Container>
        </Container>

        <section className="flex my-5">
          <div className="mx-auto">
            <div className="flex flex-col items-center min-w-[320px] mx-auto">
              <section className="text-center	text-sm	p-3">
                <h1 className="text-brand font-extrabold text-xl">
                  Teman Kita
                </h1>
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi vitae, tenetur quidem eum aliquid vel labore sint
                  placeat ad deserunt consectetur fugit ullam. Eius unde neque
                  ducimus obcaecati ipsum quos vero totam recusandae hic
                  expedita nemo sit, illum harum. Quisquam impedit ullam itaque
                  facere et ad molestiae quod reprehenderit excepturi!{" "}
                  <span className="font-extrabold">Lihat Teman</span>
                </p>
              </section>
              <article className="about-image-container">
                <Image className="about-image" src={teman} alt="foto about" />
              </article>
            </div>
          </div>
        </section>
        <section>
          <Container className="grid">
            <Row className="auto-cols-auto gap-1">
              <Col>
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
            </Row>
          </Container>
        </section>
        <section className="flex justify-center my-5">
          <div className="mx-auto">
            <h2 className="text-xxl">Mari,</h2>
            <p className="text-xl">
              bersama membantu, karna
              <br />
              <q className="bg-brand text-white text-xxl font-bold p-1.5">
                Bahagia itu Penting
              </q>
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-brand text-white pt-5 pb-4">
        <Container className="text-left">
          <Row className="text-left">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="uppercase mb-4 font-semibold">Teko</h5>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, ital consectetur lorem
                ipsum dolor sit amet adipisicing elit.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="uppercase mb-4 font-semibold">
                Ieu diisi naon euy?
              </h5>
              <p>
                <a href="#" className="text-white">
                  {" "}
                  TheProviders
                </a>
              </p>
              <p>
                <a href="#" className="text-white">
                  {" "}
                  Creativity
                </a>
              </p>
              <p>
                <a href="#" className="text-white">
                  {" "}
                  SourceFiles
                </a>
              </p>
              <p>
                <a href="#" className="text-white">
                  {" "}
                  bootstrap 5 alpha
                </a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="uppercase mb-4 font-semibold">Kontak</h5>
              <p>
                <a href="#" className="text-white">
                  {" "}
                  Farro
                </a>
              </p>
              <p>
                <a href="#" className="text-white">
                  {" "}
                  Rifqi
                </a>
              </p>
              <p>
                <a href="#" className="text-white">
                  Radya
                </a>
              </p>
              <p>
                <a href="#" className="text-white">
                  {" "}
                  Citra
                </a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="uppercase mb-4 font-semibold">Alamat</h5>
              <p>New York, NY 2333, US</p>
              <p>theproviders98@gmail.com</p>
              <p>+92 3162859445</p>
              <p>+01 335 633 77</p>
            </div>
          </Row>
          <hr className="mb-4" />
          <div className="text-center">
            <p> Copyright ©2022 All rights reserved | Teko</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default BasicExample;
