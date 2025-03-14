import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../../../data/Type";
import ProductCards from "../../partial/home/ProductCards";
import supabase from "../../../utils/supabase";

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchUserProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("userId", user?.id);

      if (error) {
        console.error("Gagal mengambil data produk:", error.message);
        setProduct([]);
      } else {
        setProduct(data || []);
      }
    };
    fetchUserProduct();
  }, [user?.id]);

  return (
    <div className="md:w-full sm:w-full w-lvh overflow-hidden">
      <section className="flex justify-center items-center mt-30">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 mb-5">
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
