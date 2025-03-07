import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import { END_API } from "../../../api/api";
import { IoLocationSharp } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";

export interface IProduct {
  id: number;
  image: string;
  title: string;
  price: number;
}

// type ICart = {
//   userId: number;
//   product: IProduct[];
// };

const ProductCards = (props: IProduct) => {
  const navigate = useNavigate();
  // const [cart, setCart] = useState<ICart[]>([]);

  const handleNavigate = () => {
    navigate(`/products/${props.id}`);
  };

  // const addCart = async (props: ICart) => {
  //   try {
  //     const response = await axios.post(`${END_API.CARTS}`, {
  //       userID: props.userId,
  //       product: props.product,
  //     });
  //     const data: ICart[] = response.data;
  //     setCart(data);
  //   } catch (error) {}
  // };

  // const handleAddToCart = () => {
  //   const userId = 1;
  //   addCart({ userId, product: [props] });
  // };

  return (
    <div
      key={props.id}
      className="md:w-54 md:h-90 2xl:w-70 h-90 bg-white rounded-xl hover:bg-gray-200 hover:transition-all cursor-pointer overflow-hidden"
    >
      <img
        onClick={handleNavigate}
        src={props.image}
        className="w-full h-58 rounded-xl object-cover bg-black shadow-md shadow-gray-350"
      />
      <div className="px-3 pt-1">
        <p>
          {props.title.length > 20
            ? props.title.substring(0, 15) + " ..."
            : props.title}
        </p>
        <p className=" text-primary text-lg font-semibold -mt-2">
          Rp. {props.price}
        </p>
        <p className="text-gray-500 text-xs mt-1">Status Barang</p>
        <div className="flex items-center gap-1 mt-1">
          <IoLocationSharp className="w-3 h-3" />
          <p className="text-gray-500 text-xs">lokasi</p>
        </div>
        <button className="cursor-pointer mt-2 text-primary">
          <LuHeart className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProductCards;
