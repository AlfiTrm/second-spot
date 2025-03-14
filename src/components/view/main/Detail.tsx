import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../../data/Type";
import lokasi from "../../../assets/detail/location.webp";
import box from "../../../assets/detail/box.webp";
import payment from "../../../assets/detail/handShake.webp";
import { FiSearch } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";
import supabase from "../../../utils/supabase";
import { useAuth } from "@clerk/clerk-react";

const Detail = ({}: IProduct) => {
  const { id } = useParams();
  const { isSignedIn } = useAuth();
  const [productDetail, setProductDetail] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const navigate = useNavigate();
  const [sellerName, setSellerName] = useState<string>("");

  const handleProtectedAction = (action: () => void) => {
    if (isSignedIn) {
      action();
    } else {
      navigate("/Login");
    }
  };

  const getProductDetail = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (error) {
      console.error("Error fetching product detail:", error);
      return;
    }

    const getSellerName = async (userId: string) => {
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching seller name:", error);
        return "Penjual tidak diketahui";
      }

      return data?.username || "Penjual tidak diketahui";
    };

    if (data) {
      const imagesArray = Array.isArray(data.image) ? data.image : [data.image];
      const seller = await getSellerName(data.userId);
      setSellerName(seller);
      setProductDetail({ ...data, images: imagesArray,  agreementMethod: data.metode_kesepakatan });
      setSelectedImage(imagesArray[0]);
    }
  };
  console.log(sellerName);
  const handleSelectImage = (img: string) => {
    setSelectedImage(img);
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  return (
    <div className="md:w-full sm:w-full w-lvh">
      <header>
        <main className="flex flex-col items-center">
          <section className="mt-30 flex gap-5 justify-center">
            <form action="" className="relative">
              <input
                type="search"
                placeholder="Cari Produk"
                className="lg:w-120 md:w-90 2xl:w-195 w-60 h-12 px-5 border border-gray-300 bg-white shadow-gray-200 rounded-full"
              />
              <button className="cursor-pointer">
                <div className="w-20 h-8 bg-primary absolute top-2 right-5 rounded-full"></div>
                <FiSearch className="absolute text-white w-4 h-4 top-4 right-13" />
              </button>
            </form>

            <form className="w-full h-12">
              <select className="md:w-80 w-40 h-full px-2.5 border bg-white border-gray-300 rounded-full">
                <option value="Pilih lokasi">Pilih lokasi</option>
                <option value="1">Sukun</option>
                <option value="2">Dau</option>
                <option value="3">Ngawi</option>
              </select>
            </form>
          </section>

          <section className="2xl:w-295 lg:w-230 md:w-full mt-10 p-5 rounded-2xl">
            <article className="flex flex-col md:flex-row">
              <figure className="flex md:flex-col">
                <img
                  src={selectedImage}
                  alt="Gambar Utama"
                  className="md:w-145  max-w-145 flex max-h-145 rounded-2xl shadow object-contain"
                />

                <div className="mt-15 md:ml-0 ml-20 flex md:flex-row flex-col md:gap-2 gap-5 ">
                  {productDetail?.images?.map((img: string, index: number) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className={`2xl:w-25 lg:w-20 md:w-15 2xl:h-25 lg:h-20 md:h-15 w-15 h-15 rounded-2xl shadow object-cover cursor-pointer ${
                        selectedImage === img ? " scale-125 mx-2" : ""
                      }`}
                      onClick={() => handleSelectImage(img)}
                    />
                  ))}
                </div>
              </figure>

              <div className="w-145 md:w-100 ml-5">
                <div className="w-full h-10/12 space-y-1">
                  <header className="flex flex-col gap-2">
                    <h2 className="font-normal text-3xl sm:text-xl md:text-2xl 2xl:text-3xl text-gray">
                      {productDetail?.title}
                    </h2>
                    <p className="font-semibold 2xl:text-4xl md:text-3xl text-2xl text-primary">
                      RP. {productDetail?.price.toLocaleString()}
                    </p>
                  </header>

                  <div className="flex md:flex-col md:items-start items-center justify-between ">
                    <figure className="2xl:mt-10 md:mt-5 mt-5 flex md:flex-row flex-col md:gap-0 w-full gap-5 md:justify-between text-lg text-gray">
                      <figcaption className="flex items-center gap-2">
                        <img
                          src={box}
                          alt="box"
                          className="2xl:w-7 2xl:h-7 w-5 h-5 "
                        />
                        <p className="text-base">{productDetail?.condition}</p>
                      </figcaption>
                      <figcaption className="flex items-center gap-2">
                        <img
                          src={payment}
                          alt="payment"
                          className="2xl:w-7 2xl:h-7 w-5 h-5"
                        />
                        <p className="text-base">{productDetail?.agreementMethod}</p>
                      </figcaption>
                      <figcaption className="flex items-center gap-2">
                        <img
                          src={lokasi}
                          alt="location"
                          className="2xl:w-6 2xl:h-7 w-4 h-5"
                        />
                        <p className="text-base">{productDetail?.location}</p>
                      </figcaption>
                    </figure>

                    <section className="flex justify-between mt-10 border rounded-2xl pt-5 px-3 2xl:w-145 w-100 h-35">
                      <div className="space-y-5">
                        <div className="flex gap-2.5">
                          {/* <img src="" alt="" /> */}
                          <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                          <p className="text-xl font-medium">{sellerName}</p>
                        </div>

                        <div className="flex gap-1 text-white font-semibold text-sm">
                          <button
                            onClick={() =>
                              handleProtectedAction(() => navigate(`/chat`))
                            }
                            className="2xl:w-70 w-40 h-10 bg-primary rounded-full cursor-pointer hover:bg-sky-600"
                          >
                            <p>Chat</p>
                          </button>
                          <button className="2xl:w-45 w-40 h-10 bg-primary rounded-full cursor-pointer hover:bg-sky-600">
                            <p>Tukar Tambah</p>
                          </button>
                          <button
                            onClick={() =>
                              handleProtectedAction(() => navigate("/favorite"))
                            }
                            className="2xl:w-15 w-10 h-10 bg-primary rounded-full cursor-pointer hover:bg-sky-600 flex items-center justify-center"
                          >
                            <LuHeart className="w-7 h-7" />
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>

                  <section className="mt-10">
                    <h2 className="font-medium 2xl:text-2xl text-xl text-primary mt-5">
                      Deskripsi Produk
                    </h2>
                    <p className="mt-5 w-200">
                      {productDetail?.description}
                    </p>
                  </section>
                </div>
              </div>
              <section></section>
            </article>
          </section>
        </main>
      </header>
    </div>
  );
};

export default Detail;
