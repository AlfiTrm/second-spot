import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface CustomDropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "default" | "plain";
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Pilih opsi",
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const varianDrop = {
    default: "bg-primary text-white",
    plain: "bg-white border border-gray-300 text-black",
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className={`h-10 border rounded-2xl px-5 flex items-center justify-between cursor-pointer ${varianDrop[variant]} `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || placeholder}</span>
        <FaChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top- left-0 w-full bg-primary border rounded-xl mt-1 shadow-md z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-5 py-2 cursor-pointer hover:bg-white hover:text-primary hover:  ${
                selected === option ? "bg-primary text-white" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
