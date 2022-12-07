'use client';

import { useState, useRef } from 'react';

import Image from 'next/image';

import {
  Container, Form, Button, Modal,
} from 'react-bootstrap';

import formBg from '@teko/public/image/formBg.jpg';
import Fetcher from '@teko/helpers/fetcher';

import Swal from 'sweetalert2';

const signupFetcher = new Fetcher({ url: 'auth/signup' });

function DaftarUmum() {
  const nama = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirmation = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.current.value !== passwordConfirmation.current.value) {
      return Swal.fire({
        icon: 'warning',
        title: 'Oww...',
        text: 'Password tidak sama!',
        confirmButtonColor: '#315343',
      });
    }
    const data = {
      name: nama.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    const result = await signupFetcher.post(data);
    if (result.error) {
      return Swal.fire({
        icon: 'error',
        title: 'Oww...',
        text: result.message,
        confirmButtonColor: '#315343',
      });
    }
    return Swal.fire({
      icon: 'success',
      title: 'Yaay...',
      text: 'Berhasil mendaftar',
      confirmButtonColor: '#315343',
    });
  };

  return (
    <>
      <div>
        <Container className="bg-white border rounded p-0 w-[95%] my-[20px]">
          <div className="flex flex-col">
            <div className="relative">
              <h1 className="font-extrabold text-3xl text-left w-1/3 absolute bottom-[8%] left-[8%] text-white md:text-5xl ">
                Selamat Datang
              </h1>
              <Image
                className="w-full h-[200px] rounded"
                src={formBg}
                alt="gambar hero"
              />
            </div>
            <div className="flex flex-col py-3">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="my-2 mx-3" controlId="formBasicNama">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    ref={nama}
                    type="text"
                    placeholder="Masukan Nama"
                    required
                  />
                </Form.Group>
                <Form.Group className="my-2 mx-3" controlId="formBasicEmail">
                  <Form.Label>Alamat Email</Form.Label>
                  <Form.Control
                    ref={email}
                    type="email"
                    placeholder="Masukan Email"
                    required
                  />
                  <Form.Text className="text-muted">
                    Kami tidak akan membagikan email Anda.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="my-2 mx-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    ref={password}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <Form.Group className="my-2 mx-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    ref={passwordConfirmation}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="bg-brand border-brand hover:bg-[#14532d] my-2 mx-3"
                >
                  Daftar
                </Button>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default function DaftarModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        className="bg-white border-brand no-underline font-semibold text-brand px-4 py-3 border border-1 md:mb-0 md:mr-6 hover:bg-[#f8fafc] rounded"
      >
        Daftar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="font-bold text-brand text-3xl">
            Teko <span className="font-light text-lg">| daftar</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex justify-center flex-col">
          <DaftarUmum></DaftarUmum>
        </Modal.Body>
      </Modal>
    </>
  );
}
