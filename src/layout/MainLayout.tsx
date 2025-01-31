import { Link, Outlet, ScrollRestoration } from "react-router-dom";

// components
import Navbar from "./Navbar";
import OffCanvas from "../components/offCanvas/OffCanvas";
import Modal from "../components/modal/Modal";
const MainLayout = () => {
  return (
    // layout component goes here...
    <div className="layout">
      <Link to="/home">
        <Navbar />
        <main>
          <Outlet />
          <OffCanvas />
          <Modal />
        </main>
        <ScrollRestoration />
      </Link>
    </div>
  );
};

export default MainLayout;
