'use client';

import { use } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import MasukModal from '../app/masukmodals';
import DaftarModal from '../app/daftarmodals';

const getData = async (q) => {
  const res = await fetch(`http://localhost:3000/api/data?q=${q}`);
  const data = await res.json();
  return data;
};
function CustomNavbar(props) {
  const menus = use(getData('menus'));
  menus.map((menu) => {
    if (menu.name === props.current) {
      menu.current = true;
      return menu;
    }
    menu.current = false;
    return menu;
  });
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="transparent"
        variant="light"
        position="fixed"
        className="w-full z-50"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <h1 className="text-brand ml-2 text-2xl font-extrabold lg:text-4xl">
              Teko
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="mx-auto">
              {menus.map((menu) => (
                <Nav.Link
                  key={menu.name}
                  className={
                    menu.current
                      ? 'mx-2 font-bold lg:text-lg'
                      : 'mx-2 lg:text-lg'
                  }
                  active
                  href={menu.href}
                >
                  {menu.name}
                </Nav.Link>
              ))}
            </Nav>
            <div className="flex flex-col md:flex-row ">
              <DaftarModal></DaftarModal>
              <MasukModal></MasukModal>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
