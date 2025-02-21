import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdChat } from "react-icons/md";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed px-4 md:px-14 top-0 flex font-medium text-xl w-full justify-between z-50 p-6 shadow-sm bg-blue-500">
      <section className="flex items-center gap-20">
        <div className="flex items-center text-white">Logo</div>
        <div className="hidden md:flex gap-10 text-white">
          <Link to={"/"}>Beranda</Link>
          <Link to={"/blabla"}>Jual</Link>
          <Link to={"/blablas"}>Barter</Link>
        </div>
      </section>

      <section className="flex items-center gap-5">
        <div className="flex items-center gap-5">
          <button className="bg-transparent text-white border border-white text-lg w-[80px] h-[40px] rounded-lg cursor-pointer">
            Masuk
          </button>
          <button className="bg-white text-lg w-[80px] h-[40px] rounded-lg cursor-pointer">
            Daftar
          </button>
          <div className="text-white cursor-pointer">
            <MdChat/>
          </div>
          <div className="text-white cursor-pointer">
            <IoCartOutline />
          </div>
          {/* <div className="text-white cursor-pointer">
            <CgProfile />
          </div> */}
        </div>
        <button
          className="md:hidden p-2 bg-white rounded-lg cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HiMenu className="text-blue-500" />
        </button>
      </section>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full h-[100vh] bg-white md:hidden shadow-lg">
          <div className="flex flex-col p-4 gap-5 items-center">
            <Link to={"/"} className="text-blue-500">
              Home
            </Link>
            <Link to={"/blabla"} className="text-blue-500">
              Jual
            </Link>
            <Link to={"/blablas"} className="text-blue-500">
              Barter
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
