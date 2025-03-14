import Carousel from "../../partial/home/Carousel";
import ProductCards from "../../partial/home/ProductCards";
import { FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../../data/Type";

const Home: React.FC = () => {
  const [product, setProduct] = useState<IProduct[]>([]);
  const [allProduct, setAllProduct] = useState<IProduct[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("Semua");
  const [locationFilter, setLocationFilter] = useState<string>("Pilih lokasi");
  const [conditionFilter, setConditionFilter] = useState<string>("Kondisi");
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [displayLimit, setDisplayLimit] = useState<number>(15);

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/products`,
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );
      const data: IProduct[] = response.data.map((item: IProduct) => ({
        ...item,
        location: getRandomLocation(),
        condition: getRandomCondition(),
      }));

      const storedProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      const mergeProducts = [...data, ...storedProducts];
      setAllProduct(mergeProducts);
      setProduct(mergeProducts);
    } catch (error) {
      console.error("Failed to Fetch products", error);
    }
  };

  const getRandomLocation = () => {
    const locations = ["Sukun", "Dau", "Ngawi"];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const getRandomCondition = () => {
    const conditions = ["Baru", "Normal", "Bekas"];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const combinedProducts = [...allProduct, ...storedProducts];
    const filteredProducts = combinedProducts
      .filter(
        (product) =>
          (categoryFilter === "Semua" || product.category === categoryFilter) &&
          (locationFilter === "Pilih lokasi" ||
            product.location === locationFilter) &&
          (conditionFilter === "Kondisi" ||
            product.condition === conditionFilter) &&
          product.title.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );

    setProduct(filteredProducts);
  }, [categoryFilter, locationFilter, conditionFilter, search, sortOrder]);

  const removeDuplicateProducts = (products: IProduct[]) => {
    const uniqueProducts = products.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    );
    return uniqueProducts;
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="pt-30 w-lvh md:w-full sm:w-full">
      <section>{search === "" && <Carousel />}</section>

      <section className="mt-10  flex gap-5 justify-center items-center">
        <form action="" className="relative">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name=""
            id=""
            placeholder="Cari Produk"
            className="w-90 md:w-120 2xl:w-195 h-12 px-5 border border-gray-300 bg-white shadow-gray-200 rounded-full"
          />
          <button className="cursor-pointer">
            <div className="w-20 h-8 bg-primary absolute top-2 right-5 rounded-full"></div>
            <FiSearch className="absolute text-white w-4 h-4 top-4 right-13" />
          </button>
        </form>

        <form className="w-95 h-12">
          <select
            onChange={(e) => setLocationFilter(e.target.value)}
            className="md:w-full w-80 h-full px-2.5 border bg-white border-gray-300 rounded-full"
          >
            <option value="Pilih lokasi">Pilih lokasi</option>
            <option value="Sukun">Sukun</option>
            <option value="Dau">Dau</option>
            <option value="Ngawi">Ngawi</option>
          </select>
        </form>
      </section>

      <section className="flex mt-10 justify-center text-white gap-5">
        <form className="w-45 h-10">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full h-full px-2.5 border bg-primary border-gray-300 rounded-full"
          >
            <option value="Semua">Semua</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </form>
        <form className="w-45 h-10">
          <select
            onChange={(e) => setConditionFilter(e.target.value)}
            className="w-full h-full px-2.5 border bg-primary border-gray-300 rounded-full"
          >
            <option value="Kondisi">Kondisi</option>
            <option value="Baru">Baru</option>
            <option value="Normal">Normal</option>
          </select>
        </form>
        <form className="w-45 h-10">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full h-full px-2.5 border bg-primary border-gray-300 rounded-full"
          >
            <option value="Harga">Harga</option>
            <option value="asc">Rendah ke tinggi</option>
            <option value="desc">Tinggi ke rendah</option>
          </select>
        </form>
      </section>

      <section className=" bg-main pt-8 px-16 2xl:px-32 flex justify-center w-full items-center mt-10">
        <div className="grid grid-cols-3 lg:grid-cols-4 md:grid-cols-3 gap-5 ">
          {removeDuplicateProducts(product)
            .slice(0, displayLimit)
            .map((product) => (
              <ProductCards key={product.id} {...product} />
            ))}
        </div>
      </section>

      <section className="flex justify-center items-center pt-10 pb-10 bg-main">
        {displayLimit < removeDuplicateProducts(product).length && (
          <button
            onClick={() => setDisplayLimit(displayLimit + 15)}
            className="bg-primary text-white font-semibold text-base w-45 h-10 rounded-full cursor-pointer hover:bg-sky-700"
          >
            Lihat lebih banyak
          </button>
        )}
      </section>
    </div>
  );
};

export default Home;
