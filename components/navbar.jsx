'use client';

import Link from 'next/link';

import useSWR from 'swr';
import Fetcher from '@teko/helpers/fetcher';

import { Navbar, Container, Nav } from 'react-bootstrap';

import RightNav from './navbar/rightNav';

function MenuNavbar(props) {
  const menusFetcher = new Fetcher(`menus?current=${props.current}`);
  const { data, error } = useSWR(menusFetcher.url, menusFetcher.fetcher, menusFetcher.swrConfig);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    data.map((menu) => (
      <Link
        key={menu.id}
        className={
          menu.current
            ? 'mx-2 font-bold no-underline text-brand p-2 lg:text-lg'
            : 'mx-2 no-underline text-brand p-2 lg:text-lg'
        }
        active={menu.current.toString()}
        href={menu.href}
      >
        {menu.name}
      </Link>
    ))
  );
}

function TekoNavbar(props) {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        position="fixed"
        className="w-full z-50 sticky top-0 bg-white drop-shadow mb-3"
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
              <MenuNavbar current={props.current} />
            </Nav>
            <div className="flex flex-col md:flex-row ">
              <RightNav></RightNav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TekoNavbar;
