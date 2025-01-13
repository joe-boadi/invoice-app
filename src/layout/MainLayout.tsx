// rrd imports
import { Link, Outlet, ScrollRestoration } from 'react-router-dom';

// components
import Navbar from './Navbar';
import OffCanvas from '../components/offCanvas/OffCanvas';
import Modal from '../components/modal/Modal';
// import Homepage from './Homapage';
// import { useState } from 'react';

const MainLayout = () => {
	// const [isLoggedin, setIsLoggedin] = useState(false);
	
	return (
    // layout component goes here...
    <div className="layout">
      <Link to="/app">
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