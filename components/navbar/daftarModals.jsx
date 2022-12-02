'use client';

// import { useState } from 'react';

import React from 'react';

import { Button, ButtonGroup, Modal } from 'react-bootstrap';

import DaftarUmum from './DaftarUmum';
import DaftarLembaga from './DaftarLembaga';

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
        <Button
          onClick={this.handleShow}
          className="bg-white border-brand no-underline font-semibold text-brand px-4 py-2 border border-1 mb-2 md:mb-0 md:mr-6 hover:bg-[#f8fafc] rounded"
        >
          Daftar
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="font-bold text-brand text-3xl">
              Teko <span className="font-light text-lg">| daftar sebagai</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="flex justify-center flex-col">
            <ButtonGroup size="lg" className="m-2">
              <Button
                className={
                  this.state.showUmum
                    ? 'bg-[#15803d] border-white hover:bg-blue-500'
                    : 'bg-brand border-white hover:bg-blue-500'
                }
                href="#"
                onClick={this.showUmum}
              >
                Umum
              </Button>
              <Button
                className={
                  this.state.showLembaga
                    ? 'bg-[#15803d] border-white hover:bg-blue-500'
                    : 'bg-brand border-white hover:bg-blue-500'
                }
                href="#"
                onClick={this.showLembaga}
              >
                Lembaga
              </Button>
            </ButtonGroup>
            {this.state.showUmum && <DaftarUmum />}
            {this.state.showLembaga && <DaftarLembaga />}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default DaftarModal;
