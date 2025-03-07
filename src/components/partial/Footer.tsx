
const Footer = () => {
  return (
    <div className="">
      <div className="flex justify-center border-t bg-white text-primary w-full h-96 gap-20 ">
        <section className="w-md ml-48 mt-24">
          <img src="" alt="" />
          <p className="font-medium text-md">
            <span className="font-bold">“Second Spot”</span> adalah platform
            jual beli barang bekas yang dirancang khusus untuk mahasiswa di
            Malang. Dengan fokus pada kemudahan, keamanan, dan transparansi
            transaksi, Second Spot menjadi solusi bagi mereka yang ingin menjual
            atau membeli barang bekas dengan lebih nyaman dan terpercaya.
          </p>
        </section>

        <section className="flex gap-20 mt-16">
          <div className="w-52">
            <h3 className="font-medium text-xl">Kategori</h3>
            <div className="font-normal mt-0.5 text-lg">
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
            <h3 className="font-medium text-xl">Ikuti Kami</h3>
            <div className="flex gap-5 mt-2.5">
              <div className="p-8 bg-white rounded-full"></div>
              <div className="p-8 bg-white rounded-full"></div>
              <div className="p-8 bg-white rounded-full"></div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Footer;
