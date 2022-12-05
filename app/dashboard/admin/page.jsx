'use client';

import Link from 'next/link';
import Image from 'next/image';

// eslint-disable-next-line object-curly-newline
import { Container, Card, Row, Col } from 'react-bootstrap';

import spanduk from '@teko/public/image/hut-ri-ke-77.png';

import { RiLogoutBoxRFill, RiMenuFoldFill, RiUserFill } from 'react-icons/ri';
import { GiThreeFriends } from 'react-icons/gi';
import Info from './info';

export default function AdminPage() {
  return (
    <>
      <Container className="bg-white shadow mt-[100px] rounded">
        <Container>
          <Container className="bg-white flex flex-row">
            <Image
              className="w-[100px] h-[100px] object-cover object-center rounded-full m-3"
              src={spanduk}
              alt="wokowko"
            />
            {/* TODO desain ini */}
            <Info />
            <Link href={'/'} className="border-brand w-20 h-20 my-auto">
              {' '}
              <RiLogoutBoxRFill className="h-full w-full text-brand" />
            </Link>
          </Container>
        </Container>
        <Container className="grid p-0">
          <Row className="grid m-4 gap-4 s:grid-cols-2 lg:grid-cols-3">
            <Link
              href={'/dashboard/admin/menu-config'}
              className="no-underline text-brand"
            >
              <Col className="p-0">
                <Card>
                  <RiMenuFoldFill className="h-full w-full" />
                  <Card.Body>
                    <Card.Title className="text-center">Menu </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            <Link href={'#'} className="no-underline text-brand">
              <Col className="p-0">
                <Card>
                  <RiUserFill className="h-full w-full" />
                  <Card.Body>
                    <Card.Title className="text-center">Pengguna </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            <Link
              href={'/dashboard/admin/teman-config'}
              className="no-underline text-brand"
            >
              <Col className="p-0">
                <Card>
                  <GiThreeFriends className="h-full w-full" />
                  <Card.Body>
                    <Card.Title className="text-center">Teman </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
          </Row>
        </Container>
      </Container>
    </>
  );
}
