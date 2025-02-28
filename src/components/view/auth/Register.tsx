import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import axios from "axios";
import vektor from "../../../assets/auth/vektor1.webp";
import { END_API } from "../../../api/api";

type UserProps = {
  id: number;
  username: string;
  email: string;
  password: string;
};

const Register = (props: UserProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username: props.username,
      email: props.email,
      password: props.password,
    };

    try {
      const response = await axios.post(`${END_API.BASE_URL}/users`, user);
      const data = await response.data;
      console.log(data);
      setUser(data);
      navigate("/Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="font-primary w-full h-[100vh] from-primary to-secondary bg-linear-0">
        <div className="flex md:px-32 justify-center md:justify-between items-center h-full">
          <img
            src={vektor}
            alt="gambar candi"
            className="absolute w-xs md:w-sm h-10/12 md:h-full bottom-0 left-0 "
          />
          <section className="text-white w-5/12 lg:w-6/12 md:flex hidden md:visible flex-col gap-10">
            <div className="flex justify-center">ini logo</div>
            <p>
              Second Spot adalah platform jual beli barang bekas yang dirancang
              khusus untuk mahasiswa dan masyarakat di Malang. Dengan fokus pada
              kemudahan, keamanan, dan transparansi transaksi, Second Spot
              menjadi solusi bagi mereka yang ingin menjual atau membeli barang
              bekas dengan lebih nyaman dan terpercaya.
            </p>
          </section>

          <section className="w-6/12 xs:w-5/12 md:w-4/12  h-8/12  bg-white rounded-xl shadow-2xl shadow-gray-500">
            <div className="px-8 pt-14  md:pt-16 flex flex-col md:gap-5 gap-10">
              <div className="font-bold text-primary text-3xl">
                <h2>Daftar</h2>
              </div>
              <form onSubmit={handleRegister} key={user.id}>
                <div className="w-full flex flex-col gap-10">
                  <input
                    value={user.username}
                    type="text"
                    placeholder="nama user"
                    onChange={() => {}}
                    required
                    className="shadow shadow-primary/50 w-full h-11 px-3 rounded-full"
                  />
                  <input
                    value={user.email}
                    type="email"
                    placeholder="email"
                    required
                    className="shadow shadow-primary/50 w-full h-11 p-2 rounded-full"
                  />
                  <div className="relative">
                    <input
                      value={user.password}
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      required
                      className="shadow shadow-primary/50 w-full h-11 p-2 rounded-full"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-500"
                    >
                      {showPassword ? (
                        <BiHide size={25} />
                      ) : (
                        <BiShowAlt size={25} />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="konfirmasi password"
                      required
                      className="shadow shadow-primary/50 w-full h-11 p-2 rounded-full"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-2.5 text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <BiHide size={25} />
                      ) : (
                        <BiShowAlt size={25} />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-5">
                    <button
                      type="submit"
                      className="flex justify-center cursor-pointer bg-primary text-white font-semibold items-center w-1/2 h-11 shadow shadow-gray-500 rounded-full hover:bg-sky-600"
                    >
                      <h3>DAFTAR</h3>
                    </button>
                    <p className="">
                      Sudah punya akun?
                      <span className="text-primary cursor-pointer">
                        <Link to={"/Login"}> Masuk</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Register;
