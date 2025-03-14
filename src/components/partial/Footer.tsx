import logo from "../../assets/logo/logo.webp";

const Footer = () => {
  return (
    <div className=" md:w-full sm:w-full w-lvh overflow-hidden">
      <div className="flex flex-col md:flex-row  bg-white border-t text-primary sm:w-full gap-10 md:gap-20 p-4">
        <section className="w-full md:w-md 2xl:ml-48 mt-24 flex md:flex-col flex-row">
          <img src={logo} alt="" className="w-64 h-18" />
          <p className="font-medium text-base text-gray">
            <span className="font-bold text-primary">“Second Spot”</span> adalah
            platform jual beli barang bekas yang dirancang khusus untuk
            mahasiswa di Malang. Dengan fokus pada kemudahan, keamanan, dan
            transparansi transaksi, Second Spot menjadi solusi bagi mereka yang
            ingin menjual atau membeli barang bekas dengan lebih nyaman dan
            terpercaya.
          </p>
        </section>

        <section className="flex gap-20 mt-16 justify-center md:justify-between">
          <div className="w--52 md:w-52">
            <h3 className="font-bold text-xl text-left md:text-left">
              Kategori
            </h3>

            <div className="font-medium mt-0.5 text-lg text-gray ">
              <ul>
                <li>
                  <a href="">Buku & Alat Tulis</a>
                </li>
                <li>
                  <a href="">Elektronik & Gadget</a>
                </li>
                <li>
                  <a href="">Kendaraan</a>
                </li>
                <li>
                  <a href="">Perabotan Kos</a>
                </li>
                <li>
                  <a href="">Fashion % Aksesoris</a>
                </li>
                <li>
                  <a href="">Olahraga & Hobi</a>
                </li>
                <li>
                  <a href="">Tiket & Voucher</a>
                </li>
              </ul>
            </div>
          </div>

          <section>
            <h3 className="font-bold text-xl">Ikuti Kami</h3>
            <div className="flex flex-col md:flex-row gap-5 mt-2.5">
              <div className="p-8 bg-gray-300 rounded-full"></div>
              <div className="p-8 bg-gray-300 rounded-full"></div>
              <div className="p-8 bg-gray-300 rounded-full"></div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Footer;

