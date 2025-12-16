import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../auth/AuthProvider";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}