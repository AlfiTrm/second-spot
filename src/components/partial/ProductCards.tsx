import cart from "../../assets/home/cart.webp";

export interface IProduct  {
  image: string;
  title: string;
  price: number;
};

const ProductCards = (props: IProduct) => {


  return (
    <div className="w-52 h-80 bg-white rounded-xl hover:scale-105 hover:transition-all hover:shadow-xl hover:shadow-gray-300 cursor-pointer">
      <img
        src={props.image}
        className="w-full h-56 rounded-xl object-contain bg-transparent shadow-md shadow-gray-350"
      />
      <div className="px-3 pt-1 text-sm h-14 font-medium">
      <p className="">{props.title.length > 30 ? props.title.substring(0, 35) + " ..." : props.title}</p>
      <p className="text-gray-500">Status Barang</p>
      </div>
      <div className="flex justify-between w-11/12">
        <p className="px-3 pt-1 text-primary font-semibold">
          Rp. {props.price}
        </p>
        <img src={cart} alt="" className="w-7 h-7 hover:scale-105 hover:shadow hover:shadow-gray-300 rounded" />
      </div>
    </div>
  );
};

export default ProductCards;
