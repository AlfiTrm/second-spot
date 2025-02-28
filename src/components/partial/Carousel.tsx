import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IProduct } from "../view/user/Home";

interface CarouselProps {
  slides: IProduct[];
}

const Carousel = (props: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<"Next" | "Prev">("Next");
  const intervalRef = useRef<number | null>(null);

  const startInterval = (): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      nextSlide();
    }, 6000);
  };

  const nextSlide = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("Next");
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % props.slides.length);
      setIsAnimating(false);
    }, 500);
    startInterval();
  };

  const prevSlide = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection("Prev");
    setTimeout(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? props.slides.length - 1 : prevSlide - 1
      );
      setIsAnimating(false);
    }, 500);
    startInterval();
  };

  return (
    <div className="flex items-center  justify-center ">
      <section className=" relaive w-full h-96 bg-primary via-primary to-secondary bg-linear-90 rounded-xl">
        <div className="mt-34 relative">
          <div className="flex justify-between px-20">
            <section className="flex flex-col gap-3 text-white">
              <h2 className="font-bold text-3xl">
                {props.slides[currentSlide].title}
              </h2>
              <div className="ml-2">
                <p className="font-light text-sm ml">
                  {props.slides[currentSlide].category}
                </p>
                <p className="font-light text-sm">
                  {props.slides[currentSlide].price}
                </p>
              </div>
              <p className="font-baseline w-[500px]">
                {props.slides[currentSlide].description}
              </p>
            </section>

            <section
              className={`transition-all duration-500 transform ${
                isAnimating
                  ? direction === "Next"
                    ? "-translate-x-6 opacity-0"
                    : "translate-x-6 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <div>{props.slides[currentSlide].image}</div>
            </section>
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-20 active:scale-75"
          aria-label="Previous Slide"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/4 transform -translate-y-1/2 cursor-pointer text-white text-3xl z-20 active:scale-75"
          aria-label="Next Slide"
        >
          <FaChevronRight />
        </button>
      </section>
    </div>
  );
};

export default Carousel;
