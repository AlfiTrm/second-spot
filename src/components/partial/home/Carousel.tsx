import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import iklanSatu from "../../../assets/carousel/iklan 1.webp";
import iklanDua from "../../../assets/carousel/iklan 2.webp";
import iklanTiga from "../../../assets/carousel/iklan 3.webp";

const slides = [iklanSatu, iklanDua, iklanTiga];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? currentSlide  : prevSlide - 1
    );
  };

  return (
    <div className="flex items-center justify-center">
      <section className="lg:w-295 h-80 bg-white rounded-xl relative overflow-hidden">
        <div className="flex transition-all duration-500 gap-10">
          <img src={slides[currentSlide]} alt="" className="rounded-xl w-1/2" />
          <img
            src={slides[(currentSlide + 1) % slides.length]}
            alt=""
            className="rounded-xl w-1/2"
          />
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 bg-primary transform cursor-pointer text-white text-3xl z-20 rounded-full p-2 active:scale-105"
          aria-label="Next Slide"
        >
          <FaChevronRight />
        </button>
        {currentSlide ?   
        <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 bg-primary p-2 rounded-full transform cursor-pointer text-white text-3xl z-20 active:scale-75"
        aria-label="Previous Slide"
        >
          <FaChevronLeft />
        </button>
        :(
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
