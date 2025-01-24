// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./auth/protectedRoute";
import Homepage from "./layout/Homepage";
import ErrorPage from "./pages/errors/ErrorPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route path="/404" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
