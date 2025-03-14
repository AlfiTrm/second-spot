import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { BsChatLeftText } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import logo from "../../assets/logo/logo.webp";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { FaHeart } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";

const Navbar: React.FC = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
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
                <button className="text-primary w-30 h-10 border border-primary rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all">
                  Daftar
                </button>
              </Link>
              <Link to={"/Login"}>
                <button className="text-primary w-30 h-10 border border-primary rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all">
                  Masuk
                </button>
              </Link>
              <Link to={"/Login"}>
                <button className="w-30 h-10 text-white bg-primary hover:bg-sky-500 rounded-full cursor-pointer ">
                  Jual
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="flex gap-6 text-primary">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <img
                    src={user?.imageUrl}
                    className="w-5 h-5 rounded-full bg-gray-300"
                  ></img>
                  <p className="text-xs">{user.username}</p>
                </button>
                <button
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => navigate("/favorite")}
                  className="cursor-pointer hover:text-primary"
                >
                  {isHovered ? (
                    <FaHeart className="w-5 h-5 text-primary hover:text-primary" />
                  ) : (
                    <LuHeart className="w-5 h-5 " />
                  )}
                </button>

                <button className="cursor-pointer">
                  <IoNotificationsOutline className="w-6 h-6" />
                </button>

                <button className="cursor-pointer">
                  <BsChatLeftText className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate("/sell")}
                  className="w-30 h-10 text-white bg-primary hover:bg-sky-600 rounded-full cursor-pointer "
                >
                  Jual
                </button>
              </div>
            </>
          )}
          <button
            className="lg:hidden rounded-lg cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HiMenu className="text-primary w-6 h-6" />
          </button>
        </div>
      </section>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full h-screen bg-white lg:hidden shadow-lg transition-all">
          <div className="flex flex-col p-4 items-center">
            <Link
              onClick={() => setIsMenuOpen(false)}
              to={"/"}
              className="w-full p-4 rounded-full text-center text-primary transition-all hover:bg-primary hover:text-white"
            >
              Beranda
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              to={"/sell"}
              className="w-full p-4 rounded-full text-center text-primary transition-all hover:bg-primary hover:text-white"
            >
              Jual
            </Link>
            <Link
              to={"/blablas"}
              className="w-full p-4 rounded-full text-center text-primary transition-all hover:bg-primary hover:text-white"
            >
              Chat
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              to={"/profile"}
              className="w-full p-4 rounded-full text-center text-primary transition-all hover:bg-primary hover:text-white"
            >
              profil
            </Link>
            {user && (
              <SignOutButton>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full p-4 rounded-full text-center text-white bg-red-500 transition-all hover:bg-red-600 cursor-pointer"
                >
                  Keluar
                </button>
              </SignOutButton>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
