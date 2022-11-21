'use client';

// import { useState } from 'react';

import React from 'react';

import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';

import DaftarUmum from './DaftarUmum';
import DaftarLembaga from './DaftarLembaga';

// function DaftarModal() {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const [showUmum, setShowUmum] = useState(false);
//   const handleCloseUmum = () => setShowUmum(false);
//   const handleShowUmum = () => setShowUmum(true);

//   const [showLembaga, setShowLembaga] = useState(false);
//   const handleCloseLembaga = () => setShowLembaga(false);
//   const handleShowLembaga = () => setShowLembaga(true);

//   return (
//     <>
//       <Link
//         href="#"
//         onClick={handleShow}
//         className="no-underline font-semibold text-brand px-4 py-2 border border-1 border-brand md:mr-6 hover:bg-[#f8fafc] rounded"
//       >
//         Daftar
//       </Link>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Daftar Sebagai:</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className=" flex justify-center">
//           <ButtonGroup size="lg" className="m-2 bg-brand">
//             <Button href="#" onclick={handleShowUmum && handleCloseLembaga}>Umum</Button>
//             <Button href="#" onclick={handleShowLembaga && handleCloseUmum}>Lembaga</Button>
//           </ButtonGroup>
//           {showUmum && <DaftarUmum />}
//           {showLembaga && <DaftarLembaga />}
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default DaftarModal;

class DaftarModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showUmum: false,
      showLembaga: false,
    };
  }

  handleClose = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  showUmum = () => {
    this.setState({ showUmum: true });
    this.setState({ showLembaga: false });
  };

  showLembaga = () => {
    this.setState({ showLembaga: true });
    this.setState({ showUmum: false });
  };

  render() {
    return (
      <>
        <Link
          href="#"
          onClick={this.handleShow}
          className="no-underline font-semibold text-brand px-4 py-2 border border-1 border-brand md:mr-6 hover:bg-[#f8fafc] rounded"
        >
          Daftar
        </Link>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Daftar Sebagai:</Modal.Title>
          </Modal.Header>
          <Modal.Body className="flex justify-center flex-col">
            <ButtonGroup size="lg" className="m-2">
              <Button className="bg-brand hover:bg-blue-500" href="#" onClick={this.showUmum}>Umum</Button>
              <Button className="bg-brand hover:bg-white" href="#" onClick={this.showLembaga}>Lembaga</Button>
            </ButtonGroup>
            {this.state.showUmum && (<DaftarUmum />)}
            {this.state.showLembaga && <DaftarLembaga />}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default DaftarModal;
