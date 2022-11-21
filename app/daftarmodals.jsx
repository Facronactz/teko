"use client";

import { useState } from "react";

import Link from "next/link";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

function DaftarModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Link
        href="#"
        onClick={handleShow}
        className="no-underline font-semibold text-brand px-4 py-2 border border-1 border-brand md:mr-6 hover:bg-[#f8fafc] rounded"
      >
        Daftar
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Daftar Sebagai:</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" flex justify-center">
          <ButtonGroup size="lg" className="m-2 bg-brand">
            <Button href="/daftarumum">Umum</Button>
            <Button href="/daftarlembaga">Lembaga</Button>
          </ButtonGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DaftarModal;

