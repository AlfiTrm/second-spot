import { CategoryProps } from "../../../data/Type";

const Category: React.FC<CategoryProps> = ({ imageSrc, text }) => {
  return (
    <div className="flex flex-col gap-2">
      <button className="w-14 h-14 md:w-20 md:h-20 flex justify-center items-center border border-gray-300 bg-white rounded-2xl cursor-pointer hover:shadow-md ">
        <img src={imageSrc} alt={""} className="w-6 md:w-10 md:h-10" />
      </button>
      <p className="flex items-center text-xs md:text-sm w-14 md:w-17">{text}</p>
    </div>
  );
};

export default Category;
