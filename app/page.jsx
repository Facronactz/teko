"use client";
import Image from 'next/image';

import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

import hero from '../public/asset/hero.jpg';
import './page.module.css';

function BasicExample() {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="transparent" variant="light">
        <Container>
          <Navbar.Brand href="#">Teko</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="mx-auto">
              <Nav.Link active href="#">Beranda</Nav.Link>
              <Nav.Link href="#">Teman</Nav.Link>
              <Nav.Link href="#">Kegiatan</Nav.Link>
            </Nav>
            <Button variant="primary" className="ms-2">Daftar</Button>
            <Button variant="outline-primary">Masuk</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section id="hero">
        <h1>Become Our Friend</h1>
        <Image src={hero} alt="gambar hero" />
      </section>
    </header>
  );
}

export default BasicExample;