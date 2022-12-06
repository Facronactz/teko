import { Container } from 'react-bootstrap';
import Link from 'next/link';

const admin = [
  { name: 'Beranda', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Menu', href: '/dashboard/admin/menu-config' },
  { name: 'Pengguna', href: '/dashboard/admin/user-config' },
  { name: 'Teman', href: '/dashboard/admin/teman-config' },
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
export default function SideBar({ role, current }) {
  return (
    <Container className="m-0 p-0 w-52 bg-brand float float-left h-full rounded">
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
    </Container>
  );
}
