"use client";
import Link from "next/Link";
import Image from "next/image";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import formBg from "../../public/image/formBg.jpg";
import lArrow from "../../public/image/leftarrow.png";

export default function daftar() {
  return (
    <>
      <div>
        <Container className="bg-white border rounded p-0 w-3/6 my-[150px]">
          <div className="flex flex-row">
            <div className="flex flex-col mr-7 relative">
              <Link
                href={"/"}
                className="w-10 h-10 rounded bg-white absolute m-3 "
              >
                <Image
                  src={lArrow}
                  className="w-3/6 m-auto mt-2"
                  alt="gambar hero"
                />
              </Link>
              <h1 className="font-extrabold text-base text-left w-1/3 absolute bottom-[8%] left-[8%] text-white xs:text-xl sm:text-2xl md:text-5xl xxl:text-6xl">
                Selamat Datang
              </h1>
              <Image className="w-full " src={formBg} alt="gambar hero" />
            </div>
            <div className="flex flex-col py-3">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicNama">
                  <Form.Label>Masukan nama</Form.Label>
                  <Form.Control type="email" placeholder="Masukan Nama" />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Masukan Email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Laki-Laki" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Perempuan" />
                </Form.Group>
                <Button
                  type="submit"
                  className="bg-brand border-brand hover:bg-[#14532d]"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
