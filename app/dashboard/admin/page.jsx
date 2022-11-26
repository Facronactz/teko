'use client';

import Link from 'next/link';
import Image from 'next/image';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import spanduk from '@teko/public/image/hut-ri-ke-77.png';

import { RiLogoutBoxRFill } from 'react-icons/ri';
import { RiMenuFoldFill } from 'react-icons/ri';
import { RiUserFill } from 'react-icons/ri';
import { GiThreeFriends } from 'react-icons/gi';
import { SiSparkpost } from 'react-icons/si';

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
            <h3 className="m-auto text-brand">Admin-1</h3>

            <Link href={'/'} className="border-brand w-20 h-20 my-auto">
              {' '}
              <RiLogoutBoxRFill className="h-full w-full text-brand" />
            </Link>
          </Container>
        </Container>
        <Container className="grid p-0">
          <Row className=" grid m-4 gap-4 s:grid-cols-2 lg:grid-cols-4">
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
                    <Card.Title className="text-center">Menu </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            <Link href={'#'} className="no-underline text-brand">
              <Col className="p-0">
                <Card>
                  <GiThreeFriends className="h-full w-full" />
                  <Card.Body>
                    <Card.Title className="text-center">Menu </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            <Link href={'#'} className="no-underline text-brand">
              <Col className="p-0">
                <Card>
                  <SiSparkpost className="h-full w-full" />
                  <Card.Body>
                    <Card.Title className="text-center">Menu </Card.Title>
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
