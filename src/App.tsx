import { BrowserRouter, Route, Routes } from "react-router";

import Dashboard from "./dashboard";
import Home from "./home";
import AdminLayout from "./layouts/admin-layout";
import PublicLayout from "./layouts/public-layout";
import Login from "./login";
import ProtectedRoute from "./protected-route";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
