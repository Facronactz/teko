'use client';

import { Container, Button, Alert } from 'react-bootstrap';
// import { useRouter } from 'next/navigation';

import { useRef } from 'react';
// import { getUploadUrl, uploadtoStorage } from '@teko/helpers/storage';
// import Fetcher from '@teko/helpers/fetcher';
// import useSWR from 'swr';
// import TekoImage from '@teko/components/image';
// import Swal from 'sweetalert2';
// import LoadingX from '@teko/components/loading';
// import TagsInput from 'react-tagsinput';

export default function TampilTeman() {
  //   const temanFetcher = new Fetcher({
  //     id: params.id,
  //     url: 'teman',
  //   });
  //   const { data } = useSWR(temanFetcher.url, temanFetcher.fetcher);
  const namaRef = useRef();
  const deskripsiRef = useRef();
  const ringkasanRef = useRef();
  const teleponRef = useRef();
  const alamatRef = useRef();
  // const logoRef = useRef();
  // const [tags, setTags] = useState([]);
  //   const upload = {
  //     nama: namaRef.current.value,
  //     deskripsi: deskripsiRef.current.value,
  //     ringkasan: ringkasanRef.current.value,
  //     telp: teleponRef.current.value,
  //     alamat: alamatRef.current.value,
  //     logo: logoRef.current.value,
  //     kategori: tags,
  //   };
  return (
    <>
      <Container className="m-auto">
        <img
          className="rounded-3 center mx-auto"
          width={150}
          height={150}
          src={'#'}
          alt={'#'}
          onClick={() => router.refresh()}
        />
        <p className="text-sm text-gray-500 text-center">ID:131231 </p>
        <form className="grid">
          <label className="font-semibold">Nama:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="nama"
            name="nama"
            defaultValue={'#'}
            ref={namaRef}
          />
          <label className="font-semibold">No Telepon:</label>
          <input
            className="border border-brand my-2 rounded px-2"
            type="tel"
            id="last"
            name="last"
            defaultValue={'2'}
            ref={teleponRef}
          />

          <label className="my-3 font-semibold">Ringkasan:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="ringkasan"
            id="ringkasan"
            cols="3"
            rows="2"
            defaultValue={'#'}
            ref={ringkasanRef}
          ></textarea>
          <label className="mb-3 font-semibold">Deskripsi:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            type="textarea"
            name="deskripsi"
            id="deskripsi"
            cols="5"
            rows="2"
            defaultValue={'#'}
            ref={deskripsiRef}
          ></textarea>
          <label className="mb-3 font-semibold">Alamat:</label>
          <textarea
            className="border border-brand rounded mb-3 px-2"
            name="alamat"
            id="alamat"
            cols="5"
            rows="2"
            defaultValue={'#'}
            ref={alamatRef}
          ></textarea>

          <label className="mb-2 font-semibold">Kategori:</label>
          {/* <TagsInput value={tags} onChange={handleChangeKategori} /> */}

          <p className="font-semibold">Ubah Logo (max 3MB).</p>
          {/* <input
            className="border border-brand my-2 rounded px-2"
            type="text"
            id="logoURL"
            name="logoURL"
            defaultValue={data.logo}
            ref={logoRef}
          />
          <p>atau</p>
          <input
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
          />
          {error && <p>{error}</p>}
          {loading && <p>Uploading...</p>}
          {logo && <p>Uploaded!</p>} */}

          <Button
            type="submit"
            className="my-3 font-semibold text-lg bg-brand border-brand py-3"
          >
            Simpan
          </Button>
        </form>
      </Container>
    </>
  );
}
