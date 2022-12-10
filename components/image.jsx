import Image from 'next/image';
import { useEffect, useState } from 'react';
import teko from '@teko/public/image/teko.png';

// eslint-disable-next-line object-curly-newline
export default function TekoImage({ src, alt, fallbackSrc, ...rest }) {
  const [img, setImg] = useState(src);

  useEffect(() => {
    setImg(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={img}
      alt={alt}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setImg(fallbackSrc || teko);
        }
      }}
      onError={() => {
        setImg(fallbackSrc || teko);
      }}
    />
  );
}
