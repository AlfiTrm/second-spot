import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { END_AUTH } from "../../../api/api";
import axios from "axios";

type LoginProps = {
  identifier: string;
  password: string;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState<LoginProps>({} as LoginProps);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = {
      identifier: user.identifier,
      password: user.password,
    };
    try {
      const response = await axios.post(`${END_AUTH.LOGIN}`, credentials);
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
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
            <div className="px-8 pt-35 flex flex-col gap-8">
              <div className="font-semibold text-primary lg:text-3xl 2xl:text-4xl">
                <h2>Masuk</h2>
              </div>
              <form onSubmit={handleLogin}>
                <div className="w-full flex flex-col gap-8">
                  <input
                    value={user.identifier}
                    onChange={(e) =>
                      setUser({ ...user, identifier: e.target.value })
                    }
                    type="email"
                    placeholder="email"
                    required
                    className="shadow shadow-primary/50  w-full h-10 px-3 rounded-full"
                  />
                  <div className="relative">
                    <input
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      autoComplete="on"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      required
                      className="shadow shadow-primary/50 w-full h-10 px-3 rounded-full"
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
                  <div className="flex flex-col items-center gap-8">
                    <button
                      type="submit"
                      className="flex justify-center cursor-pointer bg-primary text-white font-semibold items-center w-1/2 h-11 shadow shadow-gray-500 rounded-full"
                    >
                      <h3>MASUK</h3>
                    </button>
                    <p>
                      Sudah punya akun?
                      <span className="text-primary cursor-pointer">
                        <Link to={"/Register"}> Daftar</Link>
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

export default Login;
