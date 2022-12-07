'use client';

import { Table } from 'react-bootstrap';

export default function ListKegiatanPage() {
  return (
    <>
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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <input
                type="checkbox"
                className="w-6 h-6 rounded-lg"
                value={'true'}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
