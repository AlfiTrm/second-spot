import React, { useEffect, useState } from "react";
import { MdImage } from "react-icons/md";
import { IProduct } from "../../../data/Type";
import axios from "axios";
import { END_API } from "../../../api/api";
import { useUser } from "@clerk/clerk-react";
import supabase from "../../../utils/supabase";

const Sell: React.FC = () => {
  const { user } = useUser();
  const [image, setImage] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [nextId, setNextId] = useState<number | null>(null);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedImage = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          console.log("Base64 URL:", reader.result);
          reader.onerror = (error) => reject(error);
        });
      });

      Promise.all(selectedImage)
        .then((encodedImage) => {
          setImage((prevImage) => {
            const previewImage = [...prevImage, ...encodedImage];
            return previewImage.slice(0, 5);
          });
        })
        .catch((error) => {
          console.log("Gagal konversi gambar", error);
        });
    }
  };
  const handleRemove = (index: number) => {
    setImage(image.filter((_, i) => i !== index));
  };

  const getLastId = async () => {
    const response = await axios.get(`${END_API.PRODUCTS}`);
    const data: IProduct[] = response.data;
    console.log(data);
    const localData: IProduct[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    const combineData = [...data, ...localData].map((product) => ({
      ...product,
      image: Array.isArray(product.image) ? product.image : [product.image],
    }));

    if (combineData.length > 0) {
      const lastId = Math.max(...combineData.map((product) => product.id));
      setNextId(lastId + 1);
    }
  };

  useEffect(() => {
    getLastId();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !category || !condition || !price || !description) {
      alert("Kolom belum diisi sepenuhnya.");
      return;
    }

    const newProduct = {
      title,
      category,
      condition,
      location,
      price: parseFloat(price),
      description,
      image,
      userId: user?.id,
    };

    const { error } = await supabase.from("products").insert(newProduct);

    if (error) {
      console.error("gagal menyimpan produk: ", error.message);
      alert("gagal menyimpan produk");
      return;
    }

    alert("Produk terpasang.");
    setTitle("");
    setCategory("");
    setCondition("");
    setLocation("");
    setPrice("");
    setDescription("");
    setImage([]);

    setNextId((nextId ?? 0) + 1);
  };

  return (
    <div className="md:w-full sm:w-full w-lvh overflow-hidden">
      <div className="flex flex-col items-center mt-20 p-5 ">
        <header className="text-primary font-semibold w-185 text-4xl ">
          <h2>Jual</h2>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-5 gap-5"
          action=""
        >
          <div className="w-185 h-65 flex-col flex items-center relative border rounded-2xl">
            <MdImage className=" w-7 h-7 mt-5 text-primary" />
            <label className="flex justify-center items-center mt-5 w-40 h-10 cursor-pointer bg-primary text-white rounded-full hover:bg-sky-700">
              Pilih Foto
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleImage}
              />
            </label>
            <div className="flex gap-3 overflow-x-auto max-w-full">
              {image.map((image, index) => (
                <>
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-25 h-25 object-contain rounded-lg mt-8"
                    />

                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
                      onClick={() => handleRemove(index)}
                    >
                      X
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nama produk"
            className="h-10 border rounded-2xl px-5"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 border rounded-2xl px-5"
          >
            <option value="">Pilih kategori</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="h-10 border rounded-2xl px-5"
          >
            <option value="">Pilih kondisi</option>
            <option value="Baru">Baru</option>
            <option value="Normal">Normal</option>
            <option value="Bekas">Bekas</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-10 border rounded-2xl px-5"
          >
            <option value="">Pilih lokasi</option>
            <option value="Sukun">Sukun</option>
            <option value="Dau">Dau</option>
            <option value="Ngawi">Ngawi</option>
          </select>

          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga"
            className="h-10 border rounded-2xl px-5"
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi"
            className="h-50 border rounded-2xl px-5"
          />

          <button
            type="submit"
            className="h-10 bg-primary text-white font-semibold text-base rounded-2xl"
          >
            Pasang sekarang
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
