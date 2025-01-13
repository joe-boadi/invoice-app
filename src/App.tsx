import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// layout
import MainLayout from './layout/MainLayout';
// pages
import Dashboard from './pages/dashboard';
import InvoicePage, { invoiceLoader } from './pages/invoice';
import ErrorPage from './pages/errors/ErrorPage';
import { ProtectedRoute } from './auth/protectedRoute';
import { Login } from './auth/login/login';
import { Logout } from './auth/logout/logout';
import Homepage from './layout/Homepage';

function App() {
	const router = createBrowserRouter([
		{
			path: '/app',
			element: <MainLayout />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <Dashboard />,
					errorElement: <ErrorPage />,
				},
				{
					path: 'invoice/:id',
					element: (
						<ProtectedRoute >
							<InvoicePage />
						</ProtectedRoute >
					),
					loader: invoiceLoader,
					errorElement: <ErrorPage />,
				},
				
			],
		},
		{
			path: '/login',
            element: <Login />,
		},
		{
			path: '401',
            element: <ErrorPage />,
		},
		{
			path: '/logout',
            element: <Logout />,
		},
		{
			path: '/',
            element: <Homepage />,
		}
	]);

	return (
		<div className='app'>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;