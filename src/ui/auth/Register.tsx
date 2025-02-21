import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <div>
      <div className="flex">
        <section className="w-1/2 h-[100vh] bg-blue-500"></section>
        <section className="w-1/2 items-center py-10">
          <div className="">
            <div className="flex justify-center">
              <h1 className="text-3xl font-medium">Daftar</h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
