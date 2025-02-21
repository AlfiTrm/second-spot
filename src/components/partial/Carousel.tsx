import React from "react";

type Props = {};

const Carousel = (props: Props) => {
  return (
    <div className="mt-[100px] flex items-center justify-center">
      <section className="w-[1300px]  h-[400px] bg-blue-500 rounded-lg">
        <div className="pt-[80px] px-6">
          <div className="flex justify-between px-10">
            <div className="flex flex-col gap-3 text-white">
              <h2 className="font-bold text-3xl">NAMA PRODUK</h2>
              <div className="ml-2">
                <p className="font-light text-sm ml">Kategori</p>
                <p className="font-light text-sm">Harga</p>
              </div>
              <p className="font-baseline w-[500px]">
                Deskripsi Produk Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                Lorem Ipsum Lorem Ipsum
              </p>
            </div>

            <div>INI GAMBAR</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Carousel;
