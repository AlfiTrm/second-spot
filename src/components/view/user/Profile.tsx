import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../data/Type";
import ProductCards from "../../partial/home/ProductCards";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    const allProduct = JSON.parse(localStorage.getItem("products") || "[]");
    const userProduct = allProduct.filter(
      (product: IProduct) => product.userId === user?.id
    );
    console.log("Semua data", allProduct);
    console.log("Data Filter:", userProduct);
    setProduct(userProduct);
  }, [user?.id]);

  return (
    <div className="md:w-full sm:w-full w-lvh overflow-hidden">
      <section className="mt-25 flex gap-5 justify-center items-center">
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
            <option selected>Pilih lokasi</option>
            <option value="1">Sukun</option>
            <option value="2">Dau</option>
            <option value="3">Ngawi</option>
          </select>
        </form>
      </section>

      <section className="flex justify-center items-center mt-5">
        <div className="w-295 h-50 bg-main flex items-center justify-between px-5 rounded-2xl">
          <figure className="flex gap-5 items-center">
            <img src={user?.imageUrl} className="w-25 h-z25 rounded-full" />
            <figcaption className="text-4xl font-semibold text-gray">
              {user?.username}
            </figcaption>
          </figure>
          <button
            onClick={() => navigate("changeProfile")}
            className="w-40 h-10 bg-primary text-white rounded-full cursor-pointer hover:bg-sky-700"
          >
            Ubah Profil
          </button>
        </div>
      </section>

      <section className="mt-5">
        <header className="flex justify-center text-primary font-semibold text-4xl">
          <h2>Produk</h2>
        </header>
        <section className=" bg-main pt-8 px-16 2xl:px-32 flex justify-center items-center mt-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
            {product.length > 0 ? (
              product.map((product) => (
                <ProductCards key={product.id} {...product} />
              ))
            ) : (
              <p className="text-center w-full  text-red-600 mt-5">
                Belum ada produk yang dijual
              </p>
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Profile;
