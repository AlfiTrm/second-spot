import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const navigate = useNavigate();
  
    return (
    <div>
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
            <div className="w-25 h-z25 bg-gray-400 rounded-full"></div>
            <figcaption className="text-4xl font-semibold text-gray">
              Username
            </figcaption>
          </figure>
          <button onClick={() => navigate("change")} className="w-40 h-10 bg-primary text-white rounded-full cursor-pointer hover:bg-sky-700">
            Ubah Profil
          </button>
        </div>
      </section>

      <section className="mt-5">
        <header className="flex justify-center text-primary font-semibold text-4xl">
            <h2>Produk</h2>
        </header>
      </section>



    

    </div>
  );
};

export default Profile;
