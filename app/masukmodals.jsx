"use client";
import { useState } from "react";

import Link from "next/Link";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ModalFooter from "react-bootstrap/ModalFooter";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Link
        href="#"
        onClick={handleShow}
        className="no-underline font-semibold text-white bg-brand px-4 py-2 outline-brand hover:bg-[#15803d] rounded "
      >
        Masuk
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selamat Datang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ucok@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="****************"
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
            onClick={handleClose}
            className="no-underline text-white py-2 px-3 bg-brand hover:bg-light hover:bg-[#15803d] rounded "
          >
            Masuk
          </Link>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Example;
