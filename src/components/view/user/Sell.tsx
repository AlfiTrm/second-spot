import { MdImage } from "react-icons/md";

const Sell = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-20 p-5">
        <header className="text-primary font-semibold text-4xl">
          <h2>Jual</h2>
        </header>

        <form className="flex flex-col mt-5 gap-5 " action="">
          <div className="w-185 h-65 flex-col flex items-center relative border rounded-2xl">
            <MdImage className=" w-7 h-7 mt-5 text-primary" />
            <label className="flex justify-center items-center mt-5 w-40 h-10 cursor-pointer bg-primary text-white rounded-full hover:bg-sky-700">
              Pilih Foto
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
          <input
            type="text"
            placeholder="Nama produk"
            className="h-10 border rounded-2xl px-5"
          />
          <select name="" id="" className="h-10 border rounded-2xl px-5">
            <option selected>Pilih kategori</option>
          </select>
          <select name="" id="" className="h-10 border rounded-2xl px-5">
            <option selected>Pilih kondisi</option>
          </select>
          <input
            type="text"
            placeholder="Harga"
            className="h-10 border rounded-2xl px-5"
          />
          <input
            type="text"
            placeholder="Deskripsi"
            className="h-50 border rounded-2xl px-5"
          />

          <button className="h-10 bg-primary text-white font-semibold text-base rounded-2xl">
            Pasang sekarang
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
