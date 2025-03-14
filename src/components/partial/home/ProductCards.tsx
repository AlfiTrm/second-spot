import { useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { END_API } from "../../../api/api";
import { IProduct } from "../../../data/Type";
import { CartProps } from "../../../data/Type";

const ProductCards = (props: IProduct) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<CartProps[]>([]);

  useEffect(() => {
    const saveFavorite = JSON.parse(localStorage.getItem("favorites") || "[]");
    const isProductFavorite = saveFavorite.some(
      (item: IProduct) => item.id === props.id
    );
    setIsLiked(isProductFavorite);
  }, [props.id]);

  const handleNavigate = () => {
    navigate(`/products/${props.id}`);
  };

  useEffect(() => {
    console.log("Data favorite:", favorite);
  }, [favorite]);

  const addFavorites = async (product: IProduct) => {
    const userId = 1;

    try {
      const response = await axios.post(`${END_API.CARTS}`, {
        userID: userId,
        product: product,
      });
      const data: CartProps[] = response.data;
      setFavorite(data);

      const saveFavorite = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      localStorage.setItem(
        "favorites",
        JSON.stringify([...saveFavorite, product])
      );
    } catch (error) {
      console.error("Gagal menambah", error);
      alert("Gagal menambahkan produk ke favorite");
    }
  };

  const removeFavorites = async (product: IProduct) => {
    try {
      await axios.delete(`${END_API.CARTS}/${product.id}`);
      const savedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      const updatedFavorites = savedFavorites.filter(
        (item: IProduct) => item.id !== product.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      window.location.reload()
    } catch (error) {
      console.log("Gagal dihapus", error);
      alert("Produk gagal untuk dihapus");
    }
  };

  const handleAddFavorites = () => {
    if (isLiked) {
      removeFavorites(props);
    } else {
      addFavorites(props);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div
      key={props.id}
      className="md:w-50 md:h-90 2xl:w-70 h-90 bg-white rounded-xl hover:scale-105 hover:shadow-xl border border-gray-200 hover:transition-all cursor-pointer overflow-hidden "
    >
      <img
        onClick={handleNavigate}
        src={Array.isArray(props.image) ? props.image[0] : props.image}
        alt={props.title}
        className="w-50 md:w-full h-50 md:h-58  rounded-xl object-contain md:object-cover shadow-md shadow-gray-350"
      />
      <div className="px-3 pt-1">
        <p>
          {props.title.length > 20
            ? props.title.substring(0, 15) + " ..."
            : props.title}
        </p>
        <p className=" text-primary text-lg font-semibold -mt-2">
          Rp. {props.price.toLocaleString()}
        </p>
        <p className="text-gray-500 text-xs mt-1">{props.condition}</p>
        <div className="flex items-center gap-1 mt-1">
          <IoLocationSharp className="w-3 h-3" />
          <p className="text-gray-500 text-xs">{props.location}</p>
        </div>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleAddFavorites}
          className="cursor-pointer mt-2 text-primary"
        >
          {isHovered || isLiked ? (
            <FaHeart className="w-5 h-5 text-primary hover:text-primary" />
          ) : (
            <LuHeart className="w-5 h-5 " />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCards;
