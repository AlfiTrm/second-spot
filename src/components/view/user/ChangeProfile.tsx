
const ChangeProfile = () => {

  return (
    <div>
      <section className="mt-25 w-220 h-130 flex justify-between mb-5 ml-32">
        <div className="flex flex-col">
          <button className="w-45 h-10 bg-primary text-white rounded-full cursor-pointer">
            Ubah Profil
          </button>
          <button className="w-45 h-10 bg-transparent border-primary border rounded-full cursor-pointer">
            Ganti kata sandi
          </button>
        </div>

        <div className="w-145 h-130 bg-main rounded-2xl p-5">
          <h2 className="mt-5 text-primary text-4xl font-semibold">
            Ubah Profil
          </h2>

          <div className="flex flex-col gap-4 mt-5">
            <figure className="flex items-center gap-2">
              <div className="w-25 h-25 bg-gray-300 rounded-full"></div>
              <button className="w-28 h-12 bg-transparent border-primary border rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all ">
                Unggah foto
              </button>
            </figure>

            <form className="flex flex-col justify-center items-center  gap-4">
              <input
                type="text"
                placeholder="Nama"
                className="w-125 h-15 border rounded-2xl px-5"
                name=""
                id=""
              />
              <input
                type="email"
                placeholder="@username"
                className="w-125 h-15 border rounded-2xl px-5"
                name=""
                id=""
              />
              <select className="w-125 h-15 border rounded-2xl px-5" name="" id="">
                <label className="font-semibold text-lg text-primary">
                  Lokasi
                </label>
                <option selected>Pilih Lokasi</option>
                <option value="1">Pilih Lokasi</option>
              </select>
              <button className="rounded-full w-45 h-10 bg-primary text-white font-semibold text-base cursor-pointer hover:bg-sky-700">
                Simpan perubahan
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChangeProfile;
