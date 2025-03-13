import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordChange = () => {
  const { user } = useUser();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await user?.updatePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      alert("Kata sandi berhasil diperbarui.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error) {
        alert("Kata sandi lama salah atau tidak valid.");
      } else {
        alert("Terjadi kesalahan saat mengubah kata sandi.");
      }
    }
  };

  return (
    <div className="md:w-full sm:w-full w-lvh overflow-hidden">
      <div className="mt-25 max-w-220 h-auto flex md:flex-row flex-col md:justify-between md:items-baseline items-center mb-10 xl:ml-32 md:ml-10">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/profile/changeProfile")}
            className="w-45 h-10 border rounded-full cursor-pointer"
          >
            Ubah Profil
          </button>
          <button className="w-45 h-10 bg-primary text-white border rounded-full cursor-pointer">
            Ganti kata sandi
          </button>
        </div>

        <section className="w-145 h-136 rounded-2xl p-5">
          <h2 className="mt-5 text-primary text-4xl font-semibold">
            Ganti Kata Sandi
          </h2>

          <form
            onSubmit={handlePasswordChange}
            className="flex flex-col justify-center items-center gap-4 mt-5"
          >
            <input
              type="password"
              placeholder="Kata sandi lama"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-125 h-15 border rounded-2xl px-5"
            />
            <input
              type="password"
              placeholder="Kata sandi baru"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-125 h-15 border rounded-2xl px-5"
            />
            <input
              type="password"
              placeholder="Konfirmasi kata sandi baru"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-125 h-15 border rounded-2xl px-5"
            />
            <button
              type="submit"
              className="rounded-full w-45 h-10 bg-primary text-white font-semibold text-base cursor-pointer hover:bg-sky-700"
            >
              Simpan perubahan
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default PasswordChange;
