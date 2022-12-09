import { Button } from 'react-bootstrap';
import Fetcher from '@teko/helpers/fetcher';
import { useRef } from 'react';

export default function FormSetting({ children, user }) {
  const usersFetcer = new Fetcher('users');
  const nameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      id: user.sub,
      name: nameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
    };
    await usersFetcer.put(data);
    // TODO: add sweetalert
  };

  return (
    <form className="grid" onSubmit={onSubmit}>
      <label className="font-semibold">Nama:</label>
      <input
        defaultValue={user.name}
        ref={nameRef}
        className="border border-brand my-2 rounded px-2 py-1"
        type="text"
        id="name"
        name="name"
      />

      <label className="my-3 font-semibold">Username:</label>
      <input
        defaultValue={user.username}
        ref={usernameRef}
        className="border border-brand rounded mb-3 px-2 py-1"
        name="username"
        type="text"
        id="username"
      ></input>
      <label className="mb-3 font-semibold">Email:</label>
      <input
        defaultValue={user.email}
        ref={emailRef}
        className="border border-brand rounded mb-3 px-2 py-1"
        name="email"
        id="email"
        type="text"
      ></input>
      {children}
      <Button
        type="submit"
        className="my-3 font-semibold text-lg bg-brand border-brand py-3"
      >
        Simpan
      </Button>
    </form>
  );
}
