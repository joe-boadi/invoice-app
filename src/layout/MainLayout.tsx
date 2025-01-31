// rrd imports
import { Outlet, ScrollRestoration } from 'react-router-dom';
// components
import Navbar from './Navbar';
import OffCanvas from '../components/offCanvas/OffCanvas';
import Modal from '../components/modal/Modal';
import { NotificationProvider } from '../features/invoice/components/Notification/NotificationContext';

const MainLayout = () => {
	return (
		<div className='layout'>
			<NotificationProvider>
				<Navbar />
				<main>
					<Outlet />
					<OffCanvas />
					<Modal />
				</main>
				<ScrollRestoration />
			</NotificationProvider>
		</div>
	);
};

export default MainLayout;