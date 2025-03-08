import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { BsChatLeftText } from "react-icons/bs";
import { IoCloseOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuMinus, LuPlus, LuTrash, LuHeart } from "react-icons/lu";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <nav className="fixed px-4 md:px-20 lg:px-32 h-20 top-0 flex font-semibold font-primary text-xl w-full justify-between z-50 p-6 bg-main border-b-gray-500 border-b">
      <section className="flex items-center gap-20">
        <div className="flex items-center text-lg">Logo</div>
        <div className="hidden lg:flex gap-9 text-xl text-primary">
          <Link to={"/"}>Beranda</Link>
          <Link to={"/blabla"}>Kategori</Link>
        </div>
      </section>

      <section className="flex items-center gap-5">
        <div className="flex items-center gap-5">
          {/* {!user ? ( */}
          <>
            {/* <Link to={"/Register"}>
              <button className="text-primary w-30 h-10 border border-primary rounded-full cursor-pointer">
                Daftar
              </button>
            </Link>
            <Link to={"/Login"}>
              <button className="text-primary w-30 h-10 border border-primary rounded-full cursor-pointer">
                Masuk
              </button>
            </Link>
            <Link to={"/Login"}>
              <button className="w-30 h-10 text-white bg-primary rounded-full cursor-pointer hover:bg-sky-700">
                Jual
              </button>
            </Link> */}
          </>
          {/* ) : ( */}
          <>
            <div className="flex gap-6 text-primary">
              <button onClick={() => navigate("/profile")} className="lg:flex items-center gap-1 hidden">
                <div className="p-3 rounded-full bg-gray-300"></div>
                <p className="text-xs">username</p>
              </button>

              <button onClick={() => navigate("/favorite")} className="cursor-pointer">
                <LuHeart className="w-5 h-5" />
              </button>

              <button className="cursor-pointer">
                <IoNotificationsOutline className="w-6 h-6" />
              </button>

              <button className="cursor-pointer">
                <BsChatLeftText className="w-5 h-5" />
              </button>

              <button onClick={() => navigate("/sell")} className="w-30 h-10 text-white bg-primary rounded-full cursor-pointer hover:bg-sky-700">
                Jual
              </button>
              <button
                className="lg:hidden rounded-lg cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <HiMenu className="text-primary w-6 h-6" />
              </button>
            </div>

            <div className="text-black cursor-pointer">
              {/* <CgProfile className="h-6 w-6" /> */}
            </div>
          </>
          {/* )} */}
        </div>
      </section>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full h-[100vh] bg-white lg:hidden shadow-lg">
          <div className="flex flex-col p-4 gap-5 items-center">
            <Link to={"/"} className="text-primary">
              Beranda
            </Link>
            <Link to={"/blabla"} className="text-primary">
              Jual
            </Link>
            <Link to={"/blablas"} className="text-primary">
              Chat
            </Link>
            <Link to={"/blablas"} className="text-primary">
              profil
            </Link>
          </div>
        </div>
      )}
      {isCartOpen && (
        <div className="absolute  shadow shadow-gray-500 top-24 right-0 w-md h-lvh bg-white">
          <div className="p-5 text-3xl">
            <div className="flex items-center justify-between">
              <h2>Cart</h2>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="cursor-pointer"
              >
                <IoCloseOutline className="w-10 h-10" />
              </button>
            </div>

            <div className="mt-10 h-48 flex items-center ">
              <div className="border m-2 w-32 h-32 rounded-xl"></div>
              {/* <img src={HiMenu} alt="" /> */}
              <div className="text-xl mt-2 flex flex-col gap-3 w-full m-2">
                <div className="flex justify-between">
                  <h3>Nama Produk</h3>
                  <p className="text-primary text-">Rp. Xx.Xxx</p>
                </div>
                <div className="flex justify-between items-center text-lg font-normal">
                  <p>status</p>
                  <LuTrash />
                </div>
                <button className="flex items-center justify-between px-2 w-24 h-8 border rounded-xl">
                  <LuMinus />
                  <p>1</p>
                  <LuPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
