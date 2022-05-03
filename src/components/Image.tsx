import { Image } from 'antd';
import { memo } from 'react';

interface Props {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

function ImageShow({ ...props }: Props) {
  return (
    <Image
      width={props.width}
      height={props.height}
      src={props.src}
      className={props.className}
      alt={props.alt || 'ảnh'}
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
        width: '80%',
        height: '80%',
        zIndex: 1,
      }}
    />
  );
}

export default memo(ImageShow);
