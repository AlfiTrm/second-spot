import { Link } from "react-router-dom";
import vektor from "../../../assets/auth/vektor1.webp";
import { FormEvent, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { END_API } from "../../../api/api";
import axios from "axios";

type LoginProps = {
  id: number;
  username: string;
  password: string;
};

const Login = (props: LoginProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [user, setUser] = useState<LoginProps>({} as LoginProps);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = {
      username: props.username,
      password: props.password,
    };
    try {
      const response = await axios.post(
        `${END_API.BASE_URL}/auth/login`,
        credentials
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="font-primary w-full h-[100vh] from-primary to-secondary bg-linear-0">
        <section className="flex md:px-32 justify-center md:justify-between items-center h-full">
          <img
            src={vektor}
            alt="gambar candi"
            className="absolute w-md h-full bottom-0 left-0 "
          />
          <div className="text-white w-5/12 lg:w-6/12 md:flex hidden md:visible flex-col gap-10">
            <div className="flex justify-center">ini logo</div>
            <p>
              Second Spot adalah platform jual beli barang bekas yang dirancang
              khusus untuk mahasiswa dan masyarakat di Malang. Dengan fokus pada
              kemudahan, keamanan, dan transparansi transaksi, Second Spot
              menjadi solusi bagi mereka yang ingin menjual atau membeli barang
              bekas dengan lebih nyaman dan terpercaya.
            </p>
          </div>

          <section className="w-6/12 xs:w-5/12 md:w-4/12  h-6/12 bg-white rounded-xl shadow-2xl shadow-gray-500">
            <div className="px-8 pt-20 flex flex-col gap-10">
              <div className="font-bold text-primary text-3xl">
                <h2>Masuk</h2>
              </div>
              <form onSubmit={handleLogin} key={props.id}>
                <div className="w-full flex flex-col gap-5">
                  <input
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    type="text"
                    placeholder="nama user"
                    required
                    className="shadow shadow-primary/50  w-full h-11 px-3 rounded-full"
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
                  <div className="flex flex-col items-center">
                    <button
                      type="submit"
                      className="flex justify-center cursor-pointer bg-primary text-white font-semibold items-center w-1/2 h-11 shadow shadow-gray-500 rounded-full"
                    >
                      <h3>MASUK</h3>
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex justify-center -mt-6 ">
                <p>
                  Sudah punya akun?
                  <span className="text-primary cursor-pointer">
                    <Link to={"/Register"}> Daftar</Link>
                  </span>
                </p>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Login;
