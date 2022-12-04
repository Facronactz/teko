'use client';

import Link from 'next/link';

import useSWR from 'swr';
import Fetcher from '@teko/helpers/fetcher';

// eslint-disable-next-line object-curly-newline
import { Navbar, Container, Nav, Alert } from 'react-bootstrap';

import Skeleton from 'react-loading-skeleton';
import RightNav from './navbar/rightNav';

function MenuNavbar(props) {
  const menusFetcher = new Fetcher({ url: `menus?current=${props.current}` });
  const { data, error } = useSWR(menusFetcher.url, menusFetcher.fetcher, menusFetcher.swrConfig);
  // TODO: ganti semua error lain menjadi seperti dibawah
  if (error) return <Alert key='danger' variant='danger'> Error fetching data </Alert>;
  if (!data) return <Skeleton width='100px' containerClassName='flex-grow: 1; flex-direction: row' count={4} />;
  return (
    data.map((menu) => (
      <Link
        key={menu.id}
        className={
          menu.current
            ? 'mx-2 font-bold no-underline text-brand p-2 lg:text-lg'
            : 'mx-2 no-underline text-brand p-2 lg:text-lg'
        }
        prefetch={true}
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
