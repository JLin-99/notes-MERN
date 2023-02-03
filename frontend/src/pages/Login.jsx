import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-full w-2/4 grow flex-col items-center justify-center bg-gray-200">
      <section className="mb-5 flex flex-col items-center justify-center">
        <h1 className="mb-3 flex items-center justify-center gap-4 text-7xl">
          <FaSignInAlt /> Login
        </h1>
        <p className="text-2xl">Login to create notes</p>
      </section>

      <section className="w-full p-6">
        <form className="mb-6" onSubmit={onSubmit}>
          <div className="mb-6">
            <input
              className="m-0 w-full rounded-lg border border-solid border-gray-300 px-3 py-3 text-lg font-normal text-gray-700 transition ease-in-out focus:border-amber-500"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="m-0 w-full rounded-lg border border-solid border-gray-300 px-3 py-3 text-lg font-normal text-gray-700 transition ease-in-out focus:border-amber-500"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <button className="w-full rounded-lg border-2 border-gray-900 px-6 py-2 text-lg font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0">
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default Login;
