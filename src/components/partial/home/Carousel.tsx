import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import iklanSatu from "../../../assets/carousel/iklan1.webp";
import iklanDua from "../../../assets/carousel/iklan2.webp";
import slide from "../../../assets/carousel/slide.webp";

const slides = [iklanSatu, iklanDua];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? currentSlide : prevSlide - 1
    );
  };

  return (
    <div className="flex items-center justify-center ">
      <section className=" 2xl:w-295 2xl:h-60 lg:w-200 lg:h-60 w-140 h-60 bg-white rounded-xl relative overflow-hidden">
        <div className="flex transition-all gap-5 h-60 2xl:gap-10 overflow-hidden">
          <img
            src={slides[currentSlide]}
            className="rounded-xl  w-0 lg:w-295 flex"
          />
          <img
            src={slides[(currentSlide + 1) % slides.length]}
            alt=""
            className="rounded-xl w-full"
          />
        </div>
        {currentSlide < slides.length-1 && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2  cursor-pointer active:scale-105 w-10"
            aria-label="Next Slide"
          >
            <img src={slide} alt="" />
          </button>
        )}
        {currentSlide ? (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 cursor-pointer active:scale-105 w-10 rotate-180"
            aria-label="Previous Slide"
          >
            <img src={slide} alt="" />
          </button>
        ) : (
          <button
            onClick={prevSlide}
            className="absolute hidden left-0 top-1/2 bg-primary p-2 rounded-full transform cursor-pointer text-white text-3xl z-20 active:scale-75"
            aria-label="Previous Slide"
          >
            <FaChevronLeft />
          </button>
        )}
      </section>
    </div>
  );
};

export default Carousel;
