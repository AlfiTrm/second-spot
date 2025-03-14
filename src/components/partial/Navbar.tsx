import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { BsChatLeftText } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import logo from "../../assets/logo/logo.webp";
import { useUser } from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <nav className="fixed px-10 md:px-14 2xl:px-33 h-20 top-0 flex font-semibold font-primary text-xl w-full justify-between z-50 p-6 bg-main border-b-gray-500 border-b">
      <section className="flex items-center gap-9">
        <img
          onClick={() => navigate("/")}
          src={logo}
          className="flex items-center text-lg w-32 h-12 cursor-pointer"
        ></img>
        <div className="hidden lg:flex gap-9 text-xl text-primary">
          <Link to={"/"}>Beranda</Link>
          <Link to={"/blabla"}>Kategori</Link>
        </div>
      </section>

      <section className="flex items-center gap-5">
        <div className="flex items-center gap-5">
          {!user ? (
            <>
              <Link to={"/Register"}>
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
              </Link>
            </>
          ) : (
            <>
              <div className="flex gap-6 text-primary">
                <button
                  onClick={() => navigate("/profile")}
                  className="lg:flex items-center gap-1 hidden"
                >
                  <img
                    src={user?.imageUrl}
                    className="w-5 h-5 rounded-full bg-gray-300"
                  ></img>
                  <p className="text-xs">{user.username}</p>
                </button>

                <button
                  onClick={() => navigate("/favorite")}
                  className="cursor-pointer"
                >
                  <LuHeart className="w-5 h-5" />
                </button>

                <button className="cursor-pointer">
                  <IoNotificationsOutline className="w-6 h-6" />
                </button>

                <button className="cursor-pointer">
                  <BsChatLeftText className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate("/sell")}
                  className="w-30 h-10 text-white bg-primary rounded-full cursor-pointer hover:bg-sky-700"
                >
                  Jual
                </button>
                <button
                  className="lg:hidden rounded-lg cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <HiMenu className="text-primary w-6 h-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full h-lvh bg-white lg:hidden shadow-lg">
          <div className="flex flex-col p-4 gap-5 items-center">
            <Link
              onClick={() => setIsMenuOpen(false)}
              to={"/"}
              className="text-primary"
            >
              Beranda
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              to={"/sell"}
              className="text-primary"
            >
              Jual
            </Link>
            <Link to={"/blablas"} className="text-primary">
              Chat
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              to={"/profile"}
              className="text-primary"
            >
              profil
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
