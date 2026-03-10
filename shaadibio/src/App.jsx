import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import LandingPage from "./Components/Pages/LandingPage";
import Login from "./Components/Pages/Login";
import Signup from "./Components/Pages/Signup";
import UploadPhoto from "./Components/Pages/UploadPhoto";
import Preview from "./Components/Pages/Preview";
import ClassicTemplate from "./Components/templates/ClassicTemplate";
import ModernTemplate from "./Components/templates/ModernTemplate";

import PersonalDetails from "./Components/forms/PersonalDetails";
import ContactDetails from "./Components/forms/ContactDetails";
import EducationDetails from "./Components/forms/EducationDetails";
import FamilyDetails from "./Components/forms/FamilyDetails";
import HoroscopeDetails from "./Components/forms/HoroscopeDetails";

// Edit wrapper reads ?edit=true and passes isEditing prop
function EditWrapper({ Component }) {
  const [params] = useSearchParams();
  const isEditing = params.get("edit") === "true";
  const nav = window.history;
  return <Component isEditing={isEditing} onEditDone={() => nav.back()} />;
}

const PrivateRoute = ({ children, user, loading }) => {
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="text-orange-500 font-semibold animate-pulse">Loading...</div>
    </div>
  );
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const Private = ({ children }) => <PrivateRoute user={user} loading={loading}>{children}</PrivateRoute>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landingpage" />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/personaldetails" element={<Private><EditWrapper Component={PersonalDetails} /></Private>} />
        <Route path="/contactdetails" element={<Private><EditWrapper Component={ContactDetails} /></Private>} />
        <Route path="/educationdetails" element={<Private><EditWrapper Component={EducationDetails} /></Private>} />
        <Route path="/familydetails" element={<Private><EditWrapper Component={FamilyDetails} /></Private>} />
        <Route path="/horoscopedetails" element={<Private><EditWrapper Component={HoroscopeDetails} /></Private>} />

        <Route path="/uploadphoto" element={<Private><UploadPhoto /></Private>} />
        <Route path="/preview" element={<Private><Preview /></Private>} />
        <Route path="/template/classic" element={<Private><ClassicTemplate /></Private>} />
        <Route path="/template/modern" element={<Private><ModernTemplate /></Private>} />

        <Route path="*" element={<h1 className="text-center mt-20 text-2xl text-gray-500">404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
