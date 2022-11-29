'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
  Form, Modal, ModalFooter, Button,
} from 'react-bootstrap';

import { signIn } from 'next-auth/react';

import swal from 'sweetalert';
// import { getCsrfToken } from 'next-auth/react';

// const getCSRF = async () => {
//   const csrf = await fetch(`${assetPrefix}/api/auth/csrf`);
//   return csrf.json;
// };

const MasukModal = () => {
  const [show, setShow] = useState(false);
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputData;
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      swal('Maaf', 'Email atau Password salah!', 'error');
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        className="no-underline font-semibold text-white bg-brand border-brand px-4 py-2 mb-2
        md:mb-0 outline-brand hover:bg-[#15803d] rounded "
      >
        Masuk
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selamat Datang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="post" action="api/auth/callback/credentials">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="ucok@example.com"
                onChange={handleInput}
                value={inputData.email}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="**************"
                onChange={handleInput}
                value={inputData.password}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <ModalFooter>
          <Link
            href="#"
            onClick={handleClose}
            className="no-underline text-brand py-2 px-3 bg-white border border-r-brand hover:bg-[#f8fafc] rounded "
          >
            Batal
          </Link>
          <Link
            href="#"
            onClick={handleSubmit}
            className="no-underline text-white py-2 px-3 bg-brand hover:bg-light hover:bg-[#15803d] rounded "
          >
            Masuk
          </Link>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default MasukModal;
