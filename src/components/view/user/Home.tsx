import Carousel from "../../partial/home/Carousel";
import ProductCards from "../../partial/home/ProductCards";
import { FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";
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

const Home: React.FC = () => {
  const [product, setProduct] = useState<IProduct[]>([]);
  const [categoryFilter, ] = useState<string>("semua");
  const [search, setSearch] = useState<string>("");
  const [sortOrder, ] = useState<string>("");

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
    .filter(
      (product) =>
        (categoryFilter === "semua" || product.category === categoryFilter) &&
        product.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="pt-30">
      <section>{search === "" && <Carousel />}</section>

      <section className="mt-10 flex gap-5 justify-center items-center">
        <form action="" className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name=""
            id=""
            placeholder="Cari Produk"
            className="w-195 h-12 px-5 border border-gray-300 bg-white shadow-gray-200 rounded-full"
          />
          <button className="cursor-pointer">
            <div className="w-20 h-8 bg-primary absolute top-2 right-5 rounded-full"></div>
            <FiSearch className="absolute text-white w-4 h-4 top-4 right-13" />
          </button>
        </form>

        <form className="w-95 h-12">
          <select className="w-full h-full px-2.5 border bg-white border-gray-300 rounded-full">
            <option selected>Pilih lokasi</option>
            <option value="1">Sukun</option>
            <option value="2">Dau</option>
            <option value="3">Ngawi</option>
          </select>
        </form>
      </section>

      <section className="flex mt-10 justify-center text-white gap-5">
        <form className="w-45 h-10">
          <select className="w-full h-full px-2.5 border bg-primary border-gray-300 rounded-full">
            <option selected>Kategori</option>
            <option value="1">Sukun</option>
            <option value="2">Dau</option>
            <option value="3">Ngawi</option>
          </select>
        </form>
        <form className="w-45 h-10">
          <select className="w-full h-full px-2.5 border bg-primary border-gray-300 rounded-full">
            <option selected>Kondisi</option>
            <option value="1">Sukun</option>
            <option value="2">Dau</option>
            <option value="3">Ngawi</option>
          </select>
        </form>
        <form className="w-45 h-10">
          <select className="w-full h-full px-2.5 border bg-primary border-gray-300 rounded-full">
            <option selected>Harga</option>
            <option value="1">Sukun</option>
            <option value="2">Dau</option>
          </select>
        </form>
      </section>

      <section className=" bg-main pt-8 px-16 2xl:px-32 flex justify-center items-center mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-5 ">
          {filteredProducts.map((product) => (
            <ProductCards {...product} />
          ))}
        </div>
      </section>

      <section className="flex justify-center items-center pt-10 pb-10 bg-main">
        <button className="bg-primary text-white font-semibold text-base w-45 h-10 rounded-full cursor-pointer hover:bg-sky-700">
          Lihat lebih banyak
        </button>
      </section>
    </div>
  );
};

export default Home;
