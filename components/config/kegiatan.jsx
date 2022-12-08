import { Table } from 'react-bootstrap';

export default function KegiatanItemConfig({ data }) {
  return (
    <Table striped bordered hover>
      <thead className="text-center">
        <tr>
          <th>No</th>
          <th>Nama Kegiatan</th>
          <th>Tanggal</th>
          <th>Aktif</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.nama}</td>
            <td>{Date(item.tanggal)}</td>
            <input
              type="checkbox"
              className="w-6 h-6 rounded-lg"
              checked={item.active}
            />
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
