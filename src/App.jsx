import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto flex-1">
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
}

export default App;
