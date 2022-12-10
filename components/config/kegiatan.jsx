import { Table } from 'react-bootstrap';
import { ImCross } from 'react-icons/im';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Fetcher from '@teko/helpers/fetcher';
import Swal from 'sweetalert2';

export default function KegiatanItemConfig({ data, lembaga }) {
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
    <Table bordered hover className="table-auto">
      <thead className="text-center">
        <tr>
          <th>No</th>
          <th>Nama Kegiatan</th>
          {lembaga && <th>Lembaga</th>}
          <th>Tanggal</th>
          <th>Aktif</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {data.map((item, index) => (
          <tr key={index}>
            <td className="text-center align-middle">{index + 1}</td>
            <td className="text-center align-middle">{item.nama}</td>
            {lembaga && (
              <td className="text-center align-middle">{item.lembaga.nama}</td>
            )}
            <td className="text-center align-middle">{Date(item.tanggal)}</td>
            <td className="text-center align-middle">
              <input
                type="checkbox"
                className="w-6 h-6 rounded-lg m-auto"
                checked={item.active}
              />
            </td>

            <td className="flex flex-row justify-center py-4">
              <Link
                href={`/dashboard/admin/kegiatan-config/${item.id}`}
                className="bg-brand text-lg my-auto no-underline text-white rounded px-3 py-2"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteKegiatan(item.id)}
                className="bg-white border border-brand px-3 py-2 rounded my-auto ml-4"
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
