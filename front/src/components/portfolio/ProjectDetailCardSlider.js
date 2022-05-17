import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ProjectDetailCardSlider = () => {
  const slides = ["img1.png", "img2.png", "img3.png"];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    //slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const handleSlide = (dir) => {
    if (dir === "prev" && currentSlide > 0) {
      setCurrentSlide((cur) => cur - 1);
    } else if (dir === "next" && currentSlide < slides.length - 1) {
      setCurrentSlide((cur) => cur + 1);
    }
  };
  return (
    <Container>
      <SliderContainer ref={slideRef}>
        {slides.map((name, idx) => (
          <Slide key={idx} src={`/images/${name}`} />
        ))}
      </SliderContainer>
      <PrevBtn
        onClick={() => handleSlide("prev")}
        style={{ backgroundImage: `url(/images/${slides[currentSlide]})` }}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{ backgroundImage: `url(/images/${slides[currentSlide]})` }}
        />
      </PrevBtn>
      <NextBtn
        onClick={() => handleSlide("next")}
        style={{ backgroundImage: `url(/images/${slides[currentSlide]})` }}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{ backgroundImage: `url(/images/${slides[currentSlide]})` }}
        />
      </NextBtn>
    </Container>
  );
};

export default ProjectDetailCardSlider;

const Container = styled.div`
  width: 500px;
  margin: auto;
  height: 500px;
  position: relative;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  width: 500px;
  height: 500px;
  margin: auto;
  display: flex;
`;

const Slide = styled.img`
  width: 500px;
  height: 500px;
`;

const PrevBtn = styled.button`
  position: absolute;
  top: 220px;
  left: 10px;
  border: none;
  color: white;
  font-size: 50px;
  background-image: url("/images/img1.png");
`;

const NextBtn = styled.button`
  position: absolute;
  top: 220px;
  right: 10px;
  border: none;
  color: white;
  font-size: 50px;
`;
