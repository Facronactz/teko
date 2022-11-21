'use client';

import Link from 'next/link';
import Image from 'next/image';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import formBg from '../public/image/formBg.jpg';
import lArrow from '../public/image/leftarrow.png';

export default function UmumPage() {
  return (
    <>
      <div>
        <Container className="bg-white border rounded p-0 w-4/5 my-[20px] xl:my-[150px] xl:w-3/5">
          <div className="flex flex-col xl:flex-row">
            <div className="flex flex-col xl:mr-7 relative">
              <Link
                href={'/'}
                className="w-10 h-10 rounded bg-white absolute m-3 "
              >
                <Image
                  src={lArrow}
                  className="w-3/6 m-auto mt-2"
                  alt="gambar hero"
                />
              </Link>
              <h1 className="font-extrabold text-3xl text-left w-1/3 absolute bottom-[8%] left-[8%] text-white md:text-5xl xxl:text-6xl">
                Selamat Datang
              </h1>
              <Image
                className="w-full h-[200px] xl:h-full"
                src={formBg}
                alt="gambar hero"
              />
            </div>
            <div className="flex flex-col py-3">
              <Form>
                <Form.Group className="my-2 mx-3" controlId="formBasicNama">
                  <Form.Label>Masukan nama</Form.Label>
                  <Form.Control type="email" placeholder="Masukan Nama" />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="my-2 mx-3" controlId="formBasicEmail">
                  <Form.Label>Alamat Email</Form.Label>
                  <Form.Control type="email" placeholder="Masukan Email" />
                  <Form.Text className="text-muted">
                    Well never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="my-2 mx-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="my-2 mx-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Laki-Laki" />
                </Form.Group>
                <Form.Group className="my-2 mx-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Perempuan" />
                </Form.Group>
                <Button
                  type="submit"
                  className="bg-brand border-brand hover:bg-[#14532d] my-2 mx-3"
                >
                  Daftar
                </Button>
                <p className="my-2 mx-3">
                  Daftar sebagai Lembaga, <br /> <br />
                  <a
                    href="/daftarlembaga"
                    className="no-underline text-white p-2 bg-brand rounded"
                  >
                    Klik disini
                  </a>
                </p>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
