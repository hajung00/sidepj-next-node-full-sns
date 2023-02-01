import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imagesZoom';
import { backUrl } from '../config/config';
function PostImages({ images }) {
  // 이미지 클릭하면 확대
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  // Images가 1개일때
  if (images.length === 1) {
    return (
      <>
        <img
          role='presentation'
          src={`${backUrl}/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  // Images가 2개일때
  if (images.length === 2) {
    return (
      <>
        <img
          role='presentation'
          src={`${backUrl}/${images[0].src}`}
          alt={images[0].src}
          style={{ width: '50%' }}
          onClick={onZoom}
        />
        <img
          role='presentation'
          src={`${backUrl}/${images[1].src}`}
          alt={images[1].src}
          style={{ width: '50%' }}
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  // Images가 3개 이상일때
  return (
    <>
      <div>
        <img
          role='presentation'
          src={`${backUrl}/${images[0].src}`}
          alt={images[0].src}
          style={{ width: '50%' }}
          onClick={onZoom}
        />
        <div
          role='presentation'
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            verticalAlign: 'middle',
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
}

PostImages.propTypes = {
  Images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
