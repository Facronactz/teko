// import ReactLoading from 'react-loading';
// import { Suspense } from 'react';
// import { Spinner } from 'react-bootstrap';
import styles from './loading.module.css';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className='w-screen h-screen flex align-middle self-center justify-center justify-items-center justify-content-center'>
      <div className='m-auto'>
        <div className={styles.lds_ring}><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
  );
}
