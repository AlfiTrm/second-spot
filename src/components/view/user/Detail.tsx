import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { END_API } from "../../../api/api";
import { IProduct } from "./Home";
import lokasi from "../../../assets/detail/location.webp";
import box from "../../../assets/detail/box.webp";
import payment from "../../../assets/detail/handShake.webp";
import { FiSearch } from "react-icons/fi";
import { LuHeart } from "react-icons/lu";

const Detail = ({}: IProduct) => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<IProduct>({} as IProduct);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(`${END_API.BASE_URL}/products/${id}`);
      const data = response.data;
      setProductDetail(data);
    } catch (error) {
      console.log("Failed");
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  return (
    <header className="bg-main pb-40">
      <main className="flex flex-col items-center h-lvh ">
        <section className="mt-30 flex gap-5 justify-center items-center ">
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

        <section className="w-295 h-213 mt-10 px-5">
          <article className="flex">
            <figure className="flex flex-col">
              <img
                src={productDetail.image}
                alt=""
                className="w-145 h-145 rounded-2xl shadow object-cover"
              />
              <div className="mt-15 flex gap-2">
                <img
                  src={productDetail.image}
                  alt=""
                  className="w-25 h-25 rounded-2xl shadow object-cover"
                />
                <img
                  src={productDetail.image}
                  alt=""
                  className="w-25 h-25 rounded-2xl shadow object-cover"
                />
                <img
                  src={productDetail.image}
                  alt=""
                  className="w-25 h-25 rounded-2xl shadow object-cover"
                />
                <img
                  src={productDetail.image}
                  alt=""
                  className="w-25 h-25 rounded-2xl shadow object-cover"
                />
                <img
                  src={productDetail.image}
                  alt=""
                  className="w-25 h-25 rounded-2xl shadow object-cover"
                />
              </div>
            </figure>

            <div className="w-145 ml-5">
              <div className="w-full h-10/12 space-y-1">
                <header className="flex flex-col gap-2">
                  <h2 className="font-normal text-3xl text-gray">
                    {productDetail.title}
                  </h2>
                  <p className="font-semibold text-4xl text-primary">
                    RP. {productDetail.price}
                  </p>
                </header>

                <figure className="mt-10 flex justify-between text-lg text-gray">
                  <figcaption className="flex items-center gap-2">
                    <img src={box} alt="" className="w-7 h-7" />
                    <p>Seperti Baru</p>
                  </figcaption>
                  <figcaption className="flex items-center gap-2">
                    <img src={payment} alt="" className="w-7 h-7" />
                    <p>COD</p>
                  </figcaption>
                  <figcaption className="flex items-center gap-2">
                    <img src={lokasi} alt="" className="w-6 h-7" />
                    <p>Dau</p>
                  </figcaption>
                </figure>

                <section className="flex justify-between mt-10 border rounded-2xl pt-5 px-3 w-145 h-35">
                  <div className="space-y-5">
                    <div className="flex gap-2.5">
                      {/* <img src="" alt="" /> */}
                      <div className="w-10 h-10 rounded-full bg-gray-600"></div>
                      <p className="text-xl font-medium">Nama Seller</p>
                    </div>

                    <div className="flex gap-1 text-white font-semibold text-sm">
                      <button className="w-70 h-10 bg-primary rounded-full cursor-pointer hover:bg-sky-600">
                        <p>Chat</p>
                      </button>
                      <button className="w-45 h-10 bg-primary rounded-full cursor-pointer hover:bg-sky-600">
                        <p>Tukar Tambah</p>
                      </button>
                      <button className=" w-15 h-10 bg-primary rounded-full cursor-pointer hover:bg-sky-600 flex items-center justify-center">
                        <LuHeart className="w-7 h-7" />
                      </button>
                    </div>
                  </div>
                </section>

                <section className="mt-10 w-full h-auto">
                  <h2 className="font-medium text-2xl text-primary mt-5">
                    Deskripsi Produk
                  </h2>
                  <p className="mt-5">
                    Lorem ipsum dolor sit amet consectetur. Duis mauris cras
                    mollis sollicitudin sem nulla nibh. Neque nulla proin cras
                    dignissim vestibulum nisi. Auctor sapien bibendum turpis
                    eget ac sapien. Dolor habitant sollicitudin mattis cursus
                    elit ullamcorper.
                  </p>
                </section>
              </div>
            </div>
            <section></section>
          </article>
        </section>
      </main>
    </header>
  );
};

export default Detail;
