import LoadingX from '@teko/components/loading';

export default function Loading() {
  return (
    <div className="w-screen h-screen flex align-middle self-center justify-center justify-items-center justify-content-center">
      <div className="m-auto">
        <LoadingX type="ball-clip"></LoadingX>
      </div>
    </div>
  );
}
