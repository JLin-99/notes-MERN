import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex h-full w-full grow flex-col items-center justify-center bg-gray-200">
      <section>
        <h1 className="mb-20 text-7xl">Welcome to Ensolvers Notes</h1>
      </section>

      <button className="inline-block rounded border-2 border-gray-900 px-6 py-2 text-lg font-medium uppercase leading-tight text-gray-900 transition duration-100 ease-in-out hover:bg-amber-600 hover:bg-opacity-50 focus:outline-none focus:ring-0">
        <Link to="/notes">Go to note board</Link>
      </button>
    </div>
  );
};
export default Home;
