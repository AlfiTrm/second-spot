import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ProductCards from "../../partial/home/ProductCards";
import { IProduct } from "../../../data/Type";
import { useUser } from "@clerk/clerk-react";

const Favorite: React.FC = () => {
  const { user } = useUser();
  const [search] = useState<string>("");
  const [sortOrder] = useState<string>("");
  const [product, setProduct] = useState<IProduct[]>([]);
  const [categoryFilter] = useState<string>("semua");

  const getFavoriteProducts = () => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setProduct(savedFavorites);
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
    getFavoriteProducts();
  }, [user?.id]);

  return (
    <div className="md:w-full sm:w-full w-lvh overflow-hidden">
      <section className="mt-30 flex gap-5 justify-center items-center">
        <form action="" className="relative">
          <input
            type="search"
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
            <option value="Pilih Lokasi">Pilih lokasi</option>
            <option value="1">Sukun</option>
            <option value="2">Dau</option>
            <option value="3">Ngawi</option>
          </select>
        </form>
      </section>
      <header className="mt-5 px-32 text-4xl font-semibold text-primary">
        <h2>Suka</h2>
      </header>
      <section className=" bg-main pt-12 pb-12 px-16 2xl:px-32 flex justify-center items-center mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-10 ">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCards key={product.id} {...product} />
            ))
          ) : (
            <p>Belum ada Favorit</p>
          )}
        </div>
      </section>{" "}
    </div>
  );
};

export default Favorite;
