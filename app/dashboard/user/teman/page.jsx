'use client';

import Link from 'next/link';

import React from 'react';

import { Container } from 'react-bootstrap';

// import ProfilPage from './menus/profil/profil';
// import KegiatanPage from './menus/kegiatan/kegiatan';
// import ProkerPage from './menus/proker';

class DashboardTeman extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showProfil: false,
  //     showKegiatan: false,
  //     showProker: false,
  //   };
  // }

  // showProfil = () => {
  //   this.setState({ showProfil: true });
  //   this.setState({ showKegiatan: false });
  //   this.setState({ showProker: false });
  // };

  // showKegiatan = () => {
  //   this.setState({ showKegiatan: true });
  //   this.setState({ showProfil: false });
  //   this.setState({ showProker: false });
  // };

  // showProker = () => {
  //   this.setState({ showProker: true });
  //   this.setState({ showKegiatan: false });
  //   this.setState({ showProfil: false });
  // };
  render() {
    return (
      <>
        <Container className="mb-3 text-center w-full m-0 p-0 md:w-52 bg-brand md:fixed h-full">
          <h1 className="text-white p-2 font-bold">
            <Link className="text-white no-underline" href={'/'}>
              Teko
            </Link>
          </h1>
          <h5 className="text-white p-2 font-bold">Dashborad Teman</h5>
          <hr className="text-white text-center" />
          <Link
            href={'/'}
            className="m-auto bg-brand border-brand block text-white p-2 py-3 no-underline text-center float-none xs:float-left xs:ml-0"
          >
            Beranda
          </Link>
          <Link
            href={'/dashboard/teman/menus/profil'}
            className="m-auto bg-brand border-brand block text-white p-2 py-3 no-underline text-center float-none xs:float-left xs:ml-0"
          >
            Ubah Profil
          </Link>
          <Link
            href={'/dashboard/teman/menus/kegiatan'}
            className="m-auto bg-brand border-brand block text-white p-2 py-3 no-underline text-center float-none xs:float-left xs:ml-0"
          >
            Tambah Kegiatan
          </Link>
        </Container>
        <Container className="ml-0 md:mt-0 md:ml-52 md:p-4 h-full">
          <h1 className="font-bold text-brand">
            Selamat datang wahai teman &#128522;
          </h1>
          <h2 className="font-light text-brand">
            Bagaimana harimu? Semoga diberikan yang terbaik. Aamiin &#128591;
          </h2>
        </Container>
      </>
    );
  }
}

export default DashboardTeman;
