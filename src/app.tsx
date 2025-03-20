import { BrowserRouter, Route, Routes } from "react-router";

import AdminLayout from "./layouts/admin-layout";
import PublicLayout from "./layouts/public-layout";
import Dashboard from "./pages/dashboard";
import DriverForm from "./pages/driver-form";
import Drivers from "./pages/drivers";
import GrandPrixs from "./pages/grand-prixs";
import Login from "./pages/login";
import ResultsList from "./pages/public/results-list";
import Races from "./pages/races";
import Raters from "./pages/raters";
import Ratings from "./pages/ratings";
import Results from "./pages/results";
import Teams from "./pages/teams";
import ProtectedRoute from "./utils/protected-route";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<ResultsList year={""} />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="drivers">
              <Route index element={<Drivers />} />
              <Route path=":driverId/edit" element={<DriverForm />} />
              <Route path="create" element={<DriverForm />} />
            </Route>
            <Route path="grand-prixs">
              <Route index element={<GrandPrixs />} />
            </Route>
            <Route path="races">
              <Route index element={<Races />} />
            </Route>
            <Route path="raters">
              <Route index element={<Raters />} />
            </Route>
            <Route path="ratings">
              <Route index element={<Ratings />} />
            </Route>
            <Route path="results">
              <Route index element={<Results />} />
            </Route>
            <Route path="teams">
              <Route index element={<Teams />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
