type CategoryProps = {
  imageSrc: string;
  text: string;
};

const Category: React.FC<CategoryProps> = ({ imageSrc, text }) => {
  return (
    <div className="flex flex-col gap-2">
      <button className="w-18 h-18 md:w-20 md:h-20 flex justify-center items-center border border-gray-300 bg-white rounded-2xl cursor-pointer hover:bg-gray-300">
        <img src={imageSrc} alt={""} className="w-8 md:w-10 md:h-10" />
      </button>
      <p className="flex items-center text-sm w-17">{text}</p>
    </div>
  );
};

export default Category;
