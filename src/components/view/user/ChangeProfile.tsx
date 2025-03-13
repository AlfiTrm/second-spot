import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangeProfile = () => {
  const { user } = useUser();
  const [username, setUsername] = useState<string>(user?.username || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isEmailChanged, setIsEmailChanged] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [email, setEmail] = useState<string>(
    user?.primaryEmailAddress?.emailAddress || ""
  );
  const navigate = useNavigate();

  const handleProfileChange = async () => {
    try {
      if (username && username !== user?.username) {
        await user?.update({ username });
      }

      if (email && email !== user?.primaryEmailAddress?.emailAddress) {
        let updateEmail = user?.emailAddresses.find(
          (e) => e.emailAddress === email
        );
        if (!updateEmail) {
          updateEmail = await user?.createEmailAddress({ email });
        }
        await updateEmail?.prepareVerification({ strategy: "email_code" });
        alert("Email diperbarui, silahkan verifikasi lewat email.");
        setIsEmailChanged(true);
      }

      if (profileImage) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          await user?.setProfileImage({ file: profileImage });
        };
        reader.readAsDataURL(profileImage);
      }
    } catch (error) {
      alert("Gagal memperbarui profil");
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const unverifiedEmail = user?.emailAddresses.find(
        (emailObj) => !emailObj.verification.status
      );

      await unverifiedEmail?.attemptVerification({ code: verificationCode });
      alert("Email berhasil diverifikasi.");
      setIsEmailChanged(false);
      alert("Profil diperbarui");
      window.location.reload();
    } catch (error) {
      alert("Kode verifikasi salah atau tidak valid.");
    }
  };

  return (
    <div className="md:w-full sm:w-full w-lvh overflow-hidden">
      <div className="mt-25 max-w-220 h-auto flex md:flex-row flex-col md:justify-between md:items-baseline items-center mb-10 xl:ml-32 md:ml-10">
        <section className="flex flex-col gap-2">
          <button className="w-45 h-10 bg-primary text-white border rounded-full cursor-pointer">
            Ubah Profil
          </button>
          <button
            onClick={() => {
              navigate("/profile/changePassword");
            }}
            className="w-45 h-10 border rounded-full cursor-pointer"
          >
            Ganti kata sandi
          </button>
        </section>

        <section className="max-w-145 h-136 rounded-2xl p-5">
          <h2 className="mt-5 text-primary text-4xl font-semibold">
            Ubah Profil
          </h2>

          <div className="flex flex-col gap-4 mt-5">
            <figure className="flex items-center gap-2">
              {user?.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-25 h-25 rounded-full object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setProfileImage(file);
                }}
                className="hidden"
                id="uploadImage"
              />
              <label
                htmlFor="uploadImage"
                className="w-28 h-12 flex items-center justify-center border-primary border rounded-full hover:bg-primary hover:text-white cursor-pointer transition-all "
              >
                Unggah foto
              </label>
            </figure>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProfileChange();
              }}
              className="flex flex-col justify-center items-center  gap-4"
            >
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-125 h-15 border rounded-2xl px-5"
              />
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-125 h-15 border rounded-2xl px-5"
              />
              <button
                type="submit"
                className="rounded-full w-45 h-10 bg-primary text-white font-semibold text-base cursor-pointer hover:bg-sky-700"
              >
                Simpan perubahan
              </button>
            </form>
            {isEmailChanged && (
              <div className="flex flex-col justify-center items-center gap-4">
                <input
                  type="text"
                  placeholder="Masukkan kode verifikasi"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-125 h-15 border rounded-2xl px-5"
                />
                <button
                  onClick={handleVerifyEmail}
                  className="rounded-full w-45 h-10 bg-primary text-white font-semibold text-base cursor-pointer hover:bg-sky-700"
                >
                  Verifikasi Email
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChangeProfile;
