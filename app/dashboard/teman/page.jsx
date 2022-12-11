'use client';

import Link from 'next/link';

// eslint-disable-next-line object-curly-newline
import { Card, Row, Col } from 'react-bootstrap';
import { GiThreeFriends } from 'react-icons/gi';
import { BsListTask, BsFillGearFill } from 'react-icons/bs';

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
  { name: 'Teman', href: 'teman-config', icon: GiThreeFriends },
  { name: 'Kegiatan', href: 'kegiatan-config', icon: BsListTask },
  { name: 'Setting', href: 'setting', icon: BsFillGearFill },
];

export default function MenuItem() {
  return (
    <Row className="grid m-4 gap-4 s:grid-cols-1 lg:grid-cols-3">
      {menus.map((item) => (
        <Item
          key={item.name}
          name={item.name}
          href={`/dashboard/teman/${item.href}`}
        >
          <item.icon className="h-full w-full" />
        </Item>
      ))}
    </Row>
  );
}
