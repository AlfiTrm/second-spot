import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { END_API } from "../../../api/api";
import { IProduct } from "../../../data/Type";
import lokasi from "../../../assets/detail/location.webp";
import box from "../../../assets/detail/box.webp";
import payment from "../../../assets/detail/handShake.webp";
import { FiSearch } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";

const Detail = ({}: IProduct) => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const getProductDetail = async () => {
    try {
      const response = await axios.get(`${END_API.BASE_URL}/products/${id}`);
      const data = response.data;
      console.log(data.image);
      setProductDetail(data);

      if (data) {
        const imagesArray = [
          data.image,
          `${data.image}?v=1`,
          `${data.image}?v=2`,
          `${data.image}?v=3`,
          `${data.image}?v=4`,
        ];

        setProductDetail({ ...data, images: imagesArray });
        setSelectedImage(imagesArray[0]);
      } else {
        throw new Error("Data tidak ditemukan");
      }
    } catch (error) {
      const localData: IProduct[] = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      const product = localData.find((product) => product.id === Number(id));
      if (product) {
        const imagesArray = Array.isArray(product.image)
          ? product.image
          : [
              product.image,
              `${product.image}?v=1`,
              `${product.image}?v=2`,
              `${product.image}?v=3`,
              `${product.image}?v=4`,
            ];

        setProductDetail({ ...product, images: imagesArray });
        setSelectedImage(imagesArray[0]);
      } else {
        console.log("Data tidak ditemukan");
      }
      console.log("Failed");
    }
  };
  const handleSelectImage = (img: string) => {
    setSelectedImage(img);
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  return (
    <div className="md:w-full w-lvh">
      <header className="">
        <main className="flex flex-col items-center">
          <section className="mt-30 flex gap-5 justify-center">
            <form action="" className="relative">
              <input
                type="search"
                name=""
                id=""
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
                <option selected>Pilih lokasi</option>
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
                  className="md:w-full w-7/12 max-w-145 flex max-h-145 rounded-2xl shadow object-contain"
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
                    <p className="font-semibold 2xl:text-4xl md:text-2xl text-3xl text-primary">
                      RP. {productDetail?.price}
                    </p>
                  </header>

                  <div className="flex md:flex-col md:items-start items-center justify-between">
                    <figure className="2xl:mt-10 md:mt-5 mt-5 flex md:flex-row flex-col md:gap-0 gap-5 md:justify-between text-lg text-gray">
                      <figcaption className="flex items-center gap-2">
                        <img
                          src={box}
                          alt=""
                          className="2xl:w-7 2xl:h-7 w-5 h-5 "
                        />
                        <p>{productDetail?.condition}</p>
                      </figcaption>
                      <figcaption className="flex items-center gap-2">
                        <img
                          src={payment}
                          alt=""
                          className="2xl:w-7 2xl:h-7 w-5 h-5"
                        />
                        <p>{}</p>
                      </figcaption>
                      <figcaption className="flex items-center gap-2">
                        <img
                          src={lokasi}
                          alt=""
                          className="2xl:w-6 2xl:h-7 w-4 h-5"
                        />
                        <p>{productDetail?.location}</p>
                      </figcaption>
                    </figure>

                    <section className="flex justify-between mt-10 border rounded-2xl pt-5 px-3 2xl:w-145 w-100 h-35">
                      <div className="space-y-5">
                        <div className="flex gap-2.5">
                          {/* <img src="" alt="" /> */}
                          <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                          <p className="text-xl font-medium">Nama Seller</p>
                        </div>

                        <div className="flex gap-1 text-white font-semibold text-sm">
                          <button className="2xl:w-70 w-40 h-10 bg-primary rounded-full cursor-pointer hover:bg-sky-600">
                            <p>Chat</p>
                          </button>
                          <button className="2xl:w-45 w-40 h-10 bg-primary rounded-full cursor-pointer hover:bg-sky-600">
                            <p>Tukar Tambah</p>
                          </button>
                          <button className="2xl:w-15 w-10 h-10 bg-primary rounded-full cursor-pointer hover:bg-sky-600 flex items-center justify-center">
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
                    <p className="mt-5 md:w-full w-140">
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
