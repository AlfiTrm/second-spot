import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import logo from "../../../assets/logo/logo.webp";
import { useSignIn } from "@clerk/clerk-react";

const Login = () => {
  const { signIn } = useSignIn();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const results = await signIn?.create({
        identifier: email,
        password,
      });
      console.log(results?.id);
      if (results?.status === "complete") {
        navigate("/");
        window.location.reload();
      } else {
        alert("Login gagal");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="font-primary w-full h-lvh bg-white flex">
        <section className=" bg-white w-full md:flex justify-center items-center h-full hidden">
          <figure className="text-primary min-w-4/12 md:w-6/12 ">
            <img src={logo} alt="" />
          </figure>
        </section>

        <section className="w-full bg-primary flex items-center justify-center">
          <section className="w-90 h-150 2xl:w-120 2xl:h-150 bg-white rounded-xl shadow-2xl shadow-gray-500">
            <div className="px-8 pt-35 flex flex-col gap-8">
              <div className="font-semibold text-primary text-3xl 2xl:text-4xl">
                <h2>Masuk</h2>
              </div>
              <form onSubmit={handleLogin}>
                <div className="w-full flex flex-col gap-8">
                  <input
                    value={email}
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-10 px-3 rounded-full border border-primary"
                  />
                  <div className="relative">
                    <input
                      value={password}
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-10 px-3 rounded-full border border-primary"
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
                      className="flex justify-center cursor-pointer bg-primary text-white font-semibold items-center w-1/2 h-10 shadow shadow-gray-500 rounded-full hover:bg-sky-600"
                    >
                      <h3>MASUK</h3>
                    </button>
                    <p>
                      Belum punya akun?
                      <span className="text-primary cursor-pointer font-semibold">
                        <Link to={"/Register"}> Daftar</Link>
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Login;
