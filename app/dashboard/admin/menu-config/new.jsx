import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { GoPlus } from 'react-icons/go';

export default function New({ fetcher }) {
  const name = useRef();
  const href = useRef();

  async function createMenu() {
    const createData = {
      name: name.current.value,
      href: href.current.value,
    };
    await fetcher.post(createData);
  }

  return (
    <tr>
      <td className="text-center">-</td>
      <td className="text-center">
        <input
          ref={name}
          type="text"
          className="text-center border-brand rounded outline-none"
        />
      </td>
      <td className="text-center">
        <input
          ref={href}
          type="text"
          className="text-center border-brand rounded outline-none"
        />
      </td>
      <td className="flex flex-row justify-center">
        <Button onClick={createMenu} className="bg-brand text-white border-brand rounded ml-3 my-auto p-2">
          <GoPlus className="h-[30px] w-[70px] text-white" />
        </Button>
      </td>
    </tr>
  );
}
