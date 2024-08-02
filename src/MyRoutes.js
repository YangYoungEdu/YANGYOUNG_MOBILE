import { HashRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/SignIn/SignInPage";
import MaterialsPage from "./Pages/Materials/MaterialsPage";
import SechdulePage from "./Pages/Schedule/SchedulePage";
import TaggingPage from "./Pages/Tagging/TaggingPage";

function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="schedule" element={<SechdulePage />} />
      <Route path="/schedule/:id" element={<MaterialsPage />} />
      <Route path="/tagging" element={<TaggingPage />}/>
    </Routes>
  );
}

export default MyRoutes;
