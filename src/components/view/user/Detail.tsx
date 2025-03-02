import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { END_API } from "../../../api/api";
import { IProduct } from "./Home";
import lokasi from "../../../assets/detail/location.webp";
import condition from "../../../assets/detail/condition.webp";
import payment from "../../../assets/detail/payment.webp";
import whatsApp from "../../../assets/detail/ic_baseline-whatsapp.webp"
import wCart from "../../../assets/detail/white-baket.webp"

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
    <div className="bg-main">
      <div className="flex justify-center h-[100vh]">
        <div className="w-10/12 h-8/12 mt-34 px-5 py-10 bg-white shadow rounded-xl">
          <div className="flex justify-start">
            <section className="flex-flex-col">
              <img
                src={productDetail.image}
                alt=""
                className="w-lg h-96 rounded-xl shadow object-contain"
              />
            </section>

            <section className="w-full px-5">
              <div className="w-full h-10/12 space-y-1">
                <h1 className="font-medium text-3xl">{productDetail.title}</h1>
                <h2 className="font-medium text-4xl text-primary">
                  RP. {productDetail.price}
                </h2>
                <div className="mt-5 flex flex-col gap-3 text-sm">
                  <div className="flex items-center">
                    <img src={condition} alt="" className="w-7 h-7" />
                    <p>Seperti Baru</p>
                  </div>
                  <div className="flex items-center">
                    <img src={payment} alt="" className="w-7 h-7" />
                    <p>COD</p>
                  </div>
                  <div className="flex items-center">
                    <img src={lokasi} alt="" className="w-7 h-7" />
                    <p>Dau</p>
                  </div>
                </div>
                <div className="w-full bg-gray-400 p-0.5 mt-5 rounded-full"></div>

                <div className="mt-3 w-full h-4/12">
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
                </div>

                <div className="flex justify-between">
                  <div>
                    <img src="" alt="" />
                    <p className="text-xl font-medium">Nama User</p>
                  </div>
                  <div className="flex gap-2 text-white font-medium">
                    <button className="w-64 h-10 bg-primary rounded-xl cursor-pointer hover:bg-sky-600">
                      Beli Sekarang
                    </button>
                    <button>
                      <img src={whatsApp} alt="" className="w-10 h-10 p-1 bg-primary rounded-xl cursor-pointer hover:bg-sky-600" />
                    </button>
                    <button>
                      <img src={wCart} alt="" className="w-10 h-10 p-1 bg-primary rounded-xl cursor-pointer hover:bg-sky-600" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section></section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
