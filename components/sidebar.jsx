'use client';

import { Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';

const admin = [
  { name: 'Beranda', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Pengaturan Menu', href: '/dashboard/admin/menu-config' },
  { name: 'Pengguna', href: '/dashboard/admin/user-config' },
  { name: 'Teman', href: '/dashboard/admin/teman-config' },
  { name: 'Kegiatan', href: '/dashboard/admin/kegiatan-config' },
  { name: 'Logout', href: '/logout' },
];

const teman = [
  { name: 'Beranda', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Teman', href: '/dashboard/admin/teman-config' },
  { name: 'Logout', href: '/logout' },
];

const menus = {
  admin,
  teman,
};

// Cara manggilnya:
// kanan samadengan diganti
// <Sidebar role='teman' current='beranda' />

export function HiddenMenu({ role, current }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className="xl:hidden">
      <Button className="bg-brand border-brand mt-4" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Daftar Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg-brand">
          {menus[role].map((menu) => (
            <Link
              key={menu.name}
              className={
                current === menu.name.toLowerCase()
                  ? 'block text-white p-4 no-underline bg-[#15803d]'
                  : 'block text-white p-4 no-underline hover:bg-black'
              }
              href={menu.href}
            >
              {menu.name}
            </Link>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default function SideBar({ role, current }) {
  return (
    <>
      <HiddenMenu role={role} current={current} />
      <div className="hidden xl:block m-0 p-0 w-52 bg-brand h-screen rounded">
        <h1 className="text-white p-4 font-bold">Teko</h1>
        <hr className="text-white mx-3" />
        {menus[role].map((menu) => (
          <Link
            key={menu.name}
            className={
              current === menu.name.toLowerCase()
                ? 'block text-white p-4 no-underline bg-[#15803d]'
                : 'block text-white p-4 no-underline hover:bg-black'
            }
            href={menu.href}
          >
            {menu.name}
          </Link>
        ))}
      </div>
    </>
  );
}
