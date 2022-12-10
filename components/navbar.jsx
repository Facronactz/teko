'use client';

import Link from 'next/link';
import TekoImage from '@teko/components/image';

import AuthContext from '@teko/components/authContext';
import useSWR from 'swr';
import Fetcher from '@teko/helpers/fetcher';

// eslint-disable-next-line object-curly-newline
import { Navbar, Container, Nav, Alert } from 'react-bootstrap';
import logo from '@teko/public/image/logo.png';

import Skeleton from 'react-loading-skeleton';
import RightNav from './navbar/rightNav';

function MenuNavbar(props) {
  const menusFetcher = new Fetcher({ url: `menus?current=${props.current}` });
  const { data, error } = useSWR(
    menusFetcher.url,
    menusFetcher.fetcher,
    menusFetcher.swrConfig,
  );
  if (error) {
    return (
      <Alert className="m-0" key="danger" variant="danger">
        Terjadi kesalahan saat mengambil data
      </Alert>
    );
  }
  if (!data) {
    return (
      // highligh skeleton default saja~
      <Skeleton
        width="100px"
        className="mr-4"
        containerClassName="flex flex-row flex-1"
        count={4}
      />
    );
  }
  return data.map((menu) => (
    <Link
      key={menu.name}
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
  ));
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
          <Navbar.Brand href="/" className="flex flex-row my-auto ml-3">
            <TekoImage className="w-[32px] h-[32px] m-auto" src={logo} alt="logo" />
            <h1 className="text-brand ml-2 mb-0 text-2xl font-extrabold lg:text-4xl">
              Teko
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="mx-auto">
              <MenuNavbar current={props.current} />
            </Nav>
            <div className="flex flex-col md:flex-row ">
              <AuthContext>
                <RightNav></RightNav>
              </AuthContext>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TekoNavbar;
