import Link from 'next/link';

// eslint-disable-next-line object-curly-newline
import { Card, Col } from 'react-bootstrap';
import { RiMenuFoldFill, RiUserFill } from 'react-icons/ri';
import { GiThreeFriends } from 'react-icons/gi';

function Item({ name, href, children }) {
  return (
    <Link href={href} className="no-underline text-brand">
      <Col className="p-0">
        <Card>
          {children}
          <Card.Body>
            <Card.Title className="text-center"> {name} </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Link>
  );
}

const menus = [
  { name: 'Menu', href: 'menu-config', icon: RiMenuFoldFill },
  { name: 'Pengguna', href: 'teman-config', icon: RiUserFill },
  { name: 'Teman', href: 'user-config', icon: GiThreeFriends },
];

export default function MenuItem() {
  return (
    <>
      {
        menus.map((item) => (
          <Item key={item.name} name={item.name} href={`/dashboard/admin/${item.href}`}>
            <item.icon className="h-full w-full" />
          </Item>
        ))
      }
    </>
  );
}
