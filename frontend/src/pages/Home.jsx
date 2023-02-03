import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mb-10 flex h-full w-1/2 grow flex-col items-center justify-center bg-gray-200 text-center">
      <section>
        <h1 className="mb-20 text-7xl">
          Welcome to <span className="text-amber-600">E</span>nsolvers
          <span className="text-amber-600">N</span>otes
        </h1>
      </section>

      <button className="inline-block rounded-lg border-2 border-gray-900 px-6 py-3 text-xl font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0">
        <Link to="/notes">Go to note board</Link>
      </button>
    </div>
  );
};
export default Home;
