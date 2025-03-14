import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-lvh flex flex-col items-center justify-center text-center p-5 bg-gray-100">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-xl mt-3 text-gray-700">Waduhh! Halaman tidak ditemukan.</p>
      <p className="text-md text-gray-500">Mungkin halaman ini sudah dihapus atau URL yang dimasukkan salah.</p>
      <Link
        to="/"
        className="mt-5 px-6 py-3 bg-primary text-white rounded-lg hover:bg-sky-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
