import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import {
  Global,
  Overlay,
  Header,
  SlickWrapper,
  ImgWrapper,
  CloseBtn,
  Indicator,
} from './styles';
import { backUrl } from '../../config/config';
function ImagesZoom({ images, onClose }) {
  // 현재 슬라이드 위치
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slider
            initialSlide={0}
            // 슬라이드 번호주어지면 저장
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToScroll={1}
            slidesToShow={1}
          >
            {images.map((image) => (
              <ImgWrapper key={image.src}>
                <img src={`${image.src}`} alt={image.src} />
              </ImgWrapper>
            ))}
          </Slider>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length} {''}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
}

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
