'use client';

import Link from 'next/link';

import { Button } from 'react-bootstrap';

import Fetcher from '@teko/helpers/fetcher';
import useSWR from 'swr';
import Skeleton from 'react-loading-skeleton';

import { ImCross } from 'react-icons/im';
import { FiEdit3 } from 'react-icons/fi';
import Swal from 'sweetalert2';

export default function ShowTeman({ owner, role }) {
  const temanFetcher = new Fetcher({
    url: owner ? `teman?owner=${owner}` : 'teman',
  });

  const deleteTeman = async (id) => {
    const swal = await Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan data ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });
    if (swal.isConfirmed) {
      const resp = temanFetcher.delete(id);
      if (!resp.error) {
        Swal.fire({
          icon: 'success',
          title: 'Oke,',
          text: 'Data teman telah dihapus.',
          confirmButtonColor: '#315343',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal,',
          text: 'Data teman gagal dihapus.',
          confirmButtonColor: '#315343',
        });
      }
    }
  };
  const { data, error } = useSWR(
    temanFetcher.url,
    temanFetcher.fetcher,
    temanFetcher.swrConfig,
  );
  if (error) return <div>Gagal untuk memuat</div>;
  if (!data) {
    return (
      <tr>
        <td className="text-center">
          <Skeleton />
        </td>
        <td className="text-center">
          <Skeleton />
        </td>
        <td className="flex flex-row justify-center">
          <Button className="bg-brand text-white border-brand rounded ml-3 my-auto p-2">
            <FiEdit3 className="h-[25px] w-[70px] text-white" />
          </Button>
          <Button className="bg-white border-brand ml-3">
            <ImCross className="h-[25px] w-[70px] text-danger" />
          </Button>
        </td>
      </tr>
    );
  }
  if (data.length === 0) {
    return (
      <tr>
        <td className="text-center" colSpan="3">
          <p className="text-center">Tidak ada data</p>
        </td>
      </tr>
    );
  }
  return data.map((teman) => (
    <tr key={teman.id}>
      <td className="text-center align-middle">{teman.id}</td>
      <td className="text-center align-middle">{teman.nama}</td>
      <td>
        <div className="grid grid-cols-2 gap-2 m-auto text-center xxl:grid-cols-4">
          <Link
            href={`/dashboard/${role}/teman-config/${teman.id}`}
            className=" bg-brand py-3 text-center text-white rounded my-auto no-underline"
          >
            <div className="flex flex-row justify-center md:gap-3 lg:gap-0">
              <FiEdit3 className="h-[25px] text-white" />
              <span className="text-lg">Teman</span>
            </div>
          </Link>
          <Link
            href={`/dashboard/${role}/teman-config/${teman.id}/kegiatan`}
            className="bg-brand py-3 px-2 text-center text-white rounded my-auto no-underline"
          >
            <div className="flex flex-row justify-center md:gap-3 lg:gap-0">
              <FiEdit3 className="h-[25px] text-white" />
              <span className="text-lg">Kegiatan</span>
            </div>
          </Link>
          <Link
            href={`/dashboard/${role}/teman-config/${teman.id}/sosmed`}
            className="bg-brand py-3 text-center text-white rounded my-auto no-underline"
          >
            <div className="flex flex-row justify-center md:gap-3 lg:gap-0">
              <FiEdit3 className="h-[25px] text-white" />
              <span className="text-lg">Sosmed</span>
            </div>
          </Link>
          <Button
            onClick={() => deleteTeman(teman.id)}
            className="bg-white border-brand"
          >
            <ImCross className="h-[30px] xxl:h-[25px] w-auto m-auto text-danger" />
          </Button>
        </div>
      </td>
    </tr>
  ));
}
