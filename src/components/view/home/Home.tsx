import Carousel from "../../partial/home/Carousel";
import ProductCards from "../../partial/home/ProductCards";
import { FiSearch } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IProduct } from "../../../data/Type";
import CustomDropdown from "../../partial/home/DropDown";

const Home: React.FC = () => {
  const [product, setProduct] = useState<IProduct[]>([]);
  const [allProduct, setAllProduct] = useState<IProduct[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("KATEGORI");
  const [locationFilter, setLocationFilter] = useState<string>("Pilih lokasi");
  const [conditionFilter, setConditionFilter] = useState<string>("KONDISI");
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("HARGA");
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

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const combinedProducts = [...allProduct, ...storedProducts];
    const filteredProducts = combinedProducts
      .filter(
        (product) =>
          (categoryFilter === "KATEGORI" || product.category === categoryFilter) &&
          (locationFilter === "Pilih lokasi" ||
            product.location === locationFilter) &&
          (conditionFilter === "KONDISI" ||
            product.condition === conditionFilter) &&
          product.title.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        sortOrder === "HARGA" ? a.price - b.price : b.price - a.price
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
          <CustomDropdown
            options={["Pilih lokasi", "Dau", "Lowokwaru", "Dieng"]}
            selected={locationFilter}
            onChange={setLocationFilter}
            variant="plain"
            
            
          />
        </form>
      </section>

      <section className="flex mt-10 justify-center text-white gap-5">
        <form className="w-45 h-10">
          <CustomDropdown
            options={[
              "KATEGORI",
              "Buku & Alat Tulis",
              "Elektronik & Gadget",
              "Kendaraan",
              "Perabotan Kos",
              "Fashion & Aksesoris",
              "Olahraga & Hobi",
              "Tiket & Voucher",
            ]}
            selected={categoryFilter}
            onChange={setCategoryFilter}
          />
        </form>
        <form className="w-45 h-10">
          <CustomDropdown
            options={[
              "KONDISI",
              "Baru",
              "Seperti Baru",
              "Preloved",
              "Kondisi Baik",
              "Layak Pakai",
              "Apa Adanya",
            ]}
            selected={conditionFilter}
            onChange={setConditionFilter}
          />
        </form>
        <form className="w-45 h-10">
          <CustomDropdown
            options={["HARGA", "Tinggi ke Rendah", "Rendah ke Tinggi"]}
            selected={sortOrder}
            onChange={setSortOrder}
          />
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
