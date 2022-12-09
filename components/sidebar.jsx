'use client';

import { Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { signOut } from 'next-auth/react';

const admin = [
  { name: 'Beranda', href: '/' },
  { name: 'Dashboard', href: '/dashboard/admin' },
  { name: 'Pengaturan Menu', href: '/dashboard/admin/menu-config' },
  { name: 'Pengguna', href: '/dashboard/admin/user-config' },
  { name: 'Teman', href: '/dashboard/admin/teman-config' },
  { name: 'Kegiatan', href: '/dashboard/admin/kegiatan-config' },
];

const teman = [
  { name: 'Beranda', href: '/' },
  { name: 'Dashboard', href: '/dashboard/teman' },
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

  async function logAlert(e) {
    e.preventDefault();
    const swal = await Swal.fire({
      title: 'Anda yakin untuk keluar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#315343',
      confirmButtonText: 'Keluar!',
    });
    if (swal.isConfirmed) {
      signOut();
    }
  }
  return (
    <Container className="xl:hidden p-0 ">
      <Button
        className="bg-brand border-brand text-xl font-semibold mt-4 w-full text-center"
        onClick={handleShow}
      >
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
          <Button
            onClick={logAlert}
            className="bg-brand border-brand text-white p-4 w-full text-left"
          >
            Keluar
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default function SideBar({ role, current }) {
  async function logAlert(e) {
    e.preventDefault();
    const swal = await Swal.fire({
      title: 'Anda yakin untuk keluar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#315343',
      confirmButtonText: 'Keluar!',
    });
    if (swal.isConfirmed) {
      signOut();
    }
  }
  return (
    <>
      <HiddenMenu role={role} current={current} />
      <div className="hidden xl:block m-0 p-0 w-52 bg-brand h-screen min-h-[630px] rounded">
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
        <Button
          onClick={logAlert}
          className="bg-brand border-brand text-white p-4 w-full text-left"
        >
          Keluar
        </Button>
      </div>
    </>
  );
}
