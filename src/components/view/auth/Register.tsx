import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import logo from "../../../assets/logo/logo.webp";
import { useSignUp } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";

const Register = () => {
  const { signUp } = useSignUp();
  const { signOut } = useClerk();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [pendingVerif, setPendingVerif] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password != confirmPassword) {
      alert("Password anda tidak sesuai.");
      return;
    }

    try {
      await signUp?.create({
        username,
        emailAddress: email,
        password,
      });

      await signUp?.prepareEmailAddressVerification();
      setPendingVerif(true);
    } catch (error) {
      console.error("Registrasi Gagal", error);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signUp?.attemptEmailAddressVerification({ code });
      if (result?.status === "complete") {
        await signOut();
        alert("Silahkan Login");
        navigate("/Login");
      } else {
        alert("Kode verifikasi tidak valid");
      }
    } catch (error) {
      console.error("Verifikasi gagal", error);
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
            <div className="px-8 pt-17 flex flex-col gap-8">
              <h2 className="font-semibold text-primary text-xl lg:text-3xl 2xl:text-4xl">
                Daftar
              </h2>
              {pendingVerif ? (
                <form
                  onSubmit={handleVerification}
                  className="flex gap-2 flex-col"
                >
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Masukkan kode verifikasi"
                    required
                    className="p-2 shadow-lg shadow-gray-300 border border-gray-300 rounded-xl"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-primary text-white shadow-lg shadow-gray-300 rounded-xl hover:bg-sky-600 transition-all cursor-pointer"
                  >
                    Verifikasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingVerif(false)}
                    className="py-2 px-4 bg-gray-400 text-white shadow-lg shadow-gray-300 rounded-xl hover:bg-gray-500 transition-all cursor-pointer"
                  >
                    Kembali
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister}>
                  <div className="w-full flex flex-col gap-8">
                    <input
                      value={username}
                      type="text"
                      placeholder="username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full h-10 px-3 rounded-full border border-primary"
                    />
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

                    <div className="relative">
                      <input
                        value={confirmPassword}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="konfirmasi password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full h-10 px-3 rounded-full border border-primary"
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
                        <span className="text-primary cursor-pointer font-semibold">
                          <Link to={"/Login"}> Masuk</Link>
                        </span>
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Register;
