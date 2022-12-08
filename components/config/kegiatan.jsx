import { Table } from 'react-bootstrap';
import { ImCross } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Fetcher from '@teko/helpers/fetcher';
import Swal from 'sweetalert2';

export default function KegiatanItemConfig({ data }) {
  const fetcher = new Fetcher('kegiatan');
  const router = useRouter();
  const deleteKegiatan = async (id) => {
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
      const resp = fetcher.delete(id);
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
    router.refresh();
  };

  return (
    <Table bordered hover className='table-auto'>
      <thead className="text-center">
        <tr>
          <th>No</th>
          <th>Nama Kegiatan</th>
          <th>Tanggal</th>
          <th>Aktif</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {data.map((item, index) => (
          <tr key={index}>
            <input
              type="checkbox"
              className="w-6 h-6 rounded-lg"
              checked={item.active}
            />
            <td>{index + 1}</td>
            <td>{item.nama}</td>
            <td>{Date(item.tanggal)}</td>
            {/* TODO style Tombol edit dan hapus */}
            <td>
              <Link href={`/dashboard/admin/kegiatan-config/${item.id}`} className="bg-brand text-white rounded-lg px-2 py-1">
                Edit
              </Link>
              <button onClick={() => deleteKegiatan(item.id)}
                className="bg-white border-brand"
              >
                <ImCross className="h-[30px] xxl:h-[25px] w-auto m-auto text-danger" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}