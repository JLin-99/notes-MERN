import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Board from "./pages/Board";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/board" element={<PrivateRoute />}>
            <Route path="/board" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        newestOnTop
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}

export default App;
