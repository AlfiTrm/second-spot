import Carousel from "../../partial/Carousel";
import ProductCards from "../../partial/ProductCards";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { dummySlides } from "../../../data/DummySlides";
import searchIcon from "../../../assets/home/search.webp";
import bola from "../../../assets/home/bola.webp";
import baju from "../../../assets/home/baju.webp";
import buku from "../../../assets/home/buku.webp";
import hp from "../../../assets/home/hp.webp";
import motor from "../../../assets/home/motor.webp";
import kursi from "../../../assets/home/kursi.webp";
import Category from "../../partial/Category";
import ticket from "../../../assets/home/ticket.webp";
import { useEffect, useState } from "react";
import axios from "axios";
import { END_API } from "../../../api/api";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const Home = () => {
  const [product, setProduct] = useState<IProduct[]>([]);
  // const [categoryFilter, setCategoryFilter] = useState<string>('semua')
  const [search, setSearch] = useState<string>('')
  // const [sortOrder, setSortOrder] = useState<string>('')

  const getProducts = async () => {
    try {
      const response = await axios.get(`${END_API.BASE_URL}/products`);
      const data: IProduct[] = response.data;
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to Fetch products", error);
    }
  };

  const filteredProducts = product
  // .filter(product => (
  //   categoryFilter === "semua" || product.category === categoryFilter
  // ) && product.title.toLowerCase().includes(search.toLowerCase()))
  // .sort((a,b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price)

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="bg-main">
      <section >
        <Carousel slides={dummySlides} />
      </section>

      <section className="flex justify-center items-center mt-20">
        <form action="" className="relative w-96">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name=""
            id=""
            placeholder="Cari Apa?"
            className="w-96 h-12 px-12 border border-gray-100 shadow bg-white shadow-gray-200 rounded-full"
          />

          <img src={searchIcon} alt="" className="absolute top-3 left-3 w-7 h-7" />
        </form>
      </section>

      <section className="flex justify-center items-center mt-10">
        <div className="grid grid-cols-7 gap-5 md:gap-10">
          <Category imageSrc={buku} text="Buku & Alat tulis" />
          <Category imageSrc={hp} text="Elektronik & Gadget" />
          <Category imageSrc={motor} text="Kendaraan" />
          <Category imageSrc={kursi} text="Peralatan Kos" />
          <Category imageSrc={baju} text="Fashion & Aksesoris" />
          <Category imageSrc={bola} text="Olahraga & Hobi" />
          <Category imageSrc={ticket} text="Tiket & Voucher" />
        </div>
      </section>

      <section className=" flex justify-center items-center mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <ProductCards
              {...product}
            />
          ))}
        </div>
      </section>

      <section className="flex justify-center items-center mt-10 space-x-10">
        <IoIosArrowBack className="w-5 h-10" />
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow shadow-black">
          1
        </div>
        <IoIosArrowForward className="w-5 h-10" />
      </section>
    </div>
  );
};

export default Home;
