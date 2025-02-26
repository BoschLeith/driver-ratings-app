import { BrowserRouter, Route, Routes } from "react-router";

import Dashboard from "./dashboard";
import Drivers from "./drivers";
import GrandPrixs from "./grand-prixs";
import Home from "./home";
import AdminLayout from "./layouts/admin-layout";
import PublicLayout from "./layouts/public-layout";
import Login from "./login";
import ProtectedRoute from "./protected-route";
import Races from "./races";
import Raters from "./raters";
import Ratings from "./ratings";
import Results from "./results";
import Teams from "./teams";

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
              <Route path="dashboard">
                <Route index element={<Dashboard />} />
                <Route path="drivers">
                  <Route index element={<Drivers />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
