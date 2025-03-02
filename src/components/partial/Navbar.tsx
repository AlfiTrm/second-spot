import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
// import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdChat } from "react-icons/md";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  return (
    <nav className="fixed px-16 md:px-32 top-0 flex font-medium text-xl w-full justify-between z-50 p-6 h-24 from-primary via-primary to-secondary bg-linear-90">
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
          <div className="w-0.5 h-12 bg-white"></div>
          {/* <button className="text-primary bg-white font-medium w-36 h-12 rounded-full cursor-pointer">
            <Link to={"/Login"}>Masuk</Link>
          </button>
          <button className="text-white bg-primary font-medium  w-36 h-12 rounded-full cursor-pointer">
            <Link to={"/Register"}>Daftar</Link>
          </button> */}
          <div className="text-white cursor-pointer">
            <MdChat />
          </div>
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="text-white cursor-pointer"
          >
            <IoCartOutline />
          </button>
          {/* <div className="text-white cursor-pointer">
            <CgProfile />
          </div> */}
        </div>
        <button
          className="md:hidden p-2 bg-white rounded-lg cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <HiMenu className="text-primary" />
        </button>
      </section>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full h-[100vh] bg-white md:hidden shadow-lg">
          <div className="flex flex-col p-4 gap-5 items-center">
            <Link to={"/"} className="text-primary">
              Home
            </Link>
            <Link to={"/blabla"} className="text-primary">
              Jual
            </Link>
            <Link to={"/blablas"} className="text-primary">
              Barter
            </Link>
          </div>
        </div>
      )}
      {isCartOpen && (
        <div className="absolute top-20 mt-2 shadow shadow-gray-500 rounded-xl right-0 w-1/4 h-[100vh] bg-white">
          <div>{}</div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
