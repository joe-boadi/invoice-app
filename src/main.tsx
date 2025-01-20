import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.css";
import "./assets/styles/scss/index.scss";

// redux
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { AuthProvider } from "./auth/context/AuthProvider.tsx";
import { ProtectedRoute } from "./auth/protectedRoute.tsx";
import InvoicePage, { invoiceLoader } from "./pages/invoice/index.tsx";
import ErrorPage from "./pages/errors/ErrorPage.tsx";
import Login from "./auth/login/login.tsx";
import { Logout } from "./auth/logout/logout.ts";
import Homepage from "./layout/Homepage.tsx";
import Dashboard from "./pages/dashboard/index.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthGuard } from "./auth/AuthGuard.tsx";

const router = createBrowserRouter([
  {
    path: "/app",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "invoice/:id",
        element: (
          <ProtectedRoute>
            <InvoicePage />
          </ProtectedRoute>
        ),
        loader: invoiceLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "401",
    element: <ErrorPage />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  </Provider>
);
