import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import axios from "axios";
import { END_AUTH } from "../../../api/api";

type UserProps = {
  id: number;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email: user.email,
      username: user.username,
      password: user.password,
      confirm_password: user.confirm_password,
    };

    try {
      const response = await axios.post(`${END_AUTH.REGISTER}`, userData);
      const data = await response.data;
      console.log(data);
      setUser(data);
      navigate("/Login");
    } catch (error) {
      console.error("as", error);
    }
  };

  return (
    <div>
      <div className="font-primary w-full h-lvh bg-white">
        <div className="flex lg:justify-between justify-center items-center h-full lg:px-52 2xl:px-56">
          
          <section className="text-primary border min-w-4/12 md:w-6/12 lg:w-6/12 lg:flex hidden md:visible flex-col gap-10">
            <div className="flex justify-center">ini logo</div>
            {/* <p>
              Second Spot adalah platform jual beli barang bekas yang dirancang
              khusus untuk mahasiswa dan masyarakat di Malang. Dengan fokus pada
              kemudahan, keamanan, dan transparansi transaksi, Second Spot
              menjadi solusi bagi mereka yang ingin menjual atau membeli barang
              bekas dengan lebih nyaman dan terpercaya.
            </p> */}
          </section>

          <section className="w-110 h-150 lg:w-120 2xl:h-150 bg-white rounded-xl shadow-2xl shadow-gray-500">
            <div className="px-8 pt-17 flex flex-col gap-8">
              <div className="font-semibold text-primary lg:text-3xl 2xl:text-4xl">
                <h2>Daftar</h2>
              </div>
              <form onSubmit={handleRegister} key={user.id}>
                <div className="w-full flex flex-col gap-8">
                  <input
                    value={user.email}
                    type="email"
                    placeholder="email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    required
                    className="shadow shadow-primary/50 w-full h-10 px-3 rounded-full"
                  />
                  <input
                    value={user.username}
                    type="text"
                    placeholder="username"
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    required
                    className="shadow shadow-primary/50 w-full h-10 p-2 rounded-full"
                  />
                  <div className="relative">
                    <input
                      value={user.password}
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      required
                      className="shadow shadow-primary/50 w-full h-10 p-2 rounded-full"
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
                      value={user.confirm_password}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="konfirmasi password"
                      onChange={(e) =>
                        setUser({ ...user, confirm_password: e.target.value })
                      }
                      required
                      className="shadow shadow-primary/50 w-full h-10 p-2 rounded-full"
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

                  <div className="flex flex-col items-center gap-8">
                    <button
                      type="submit"
                      className="flex justify-center cursor-pointer bg-primary text-white font-semibold items-center w-1/2 h-10 shadow shadow-gray-500 rounded-full hover:bg-sky-600"
                    >
                      <h3>DAFTAR</h3>
                    </button>
                    <p>
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
