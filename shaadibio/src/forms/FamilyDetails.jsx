import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { saveProfile } from "../../utils/saveProfile";
import StepIndicator from "../StepIndicator";

export default function FamilyDetails({ initialData = {}, isEditing, onEditDone }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fatherName: initialData.fatherName || "",
    fatherOccupation: initialData.fatherOccupation || "",
    motherName: initialData.motherName || "",
    motherOccupation: initialData.motherOccupation || "",
    siblings: initialData.siblings || "",
    familyType: initialData.familyType || "",
    familyStatus: initialData.familyStatus || "",
    familyLocation: initialData.familyLocation || "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!data.fatherName) e.fatherName = "Father's name is required";
    if (!data.motherName) e.motherName = "Mother's name is required";
    if (!data.familyType) e.familyType = "Family type is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    setSaving(true);
    await saveProfile(auth.currentUser.uid, "family", data);
    setSaving(false);
    if (isEditing) { onEditDone(); return; }
    navigate("/horoscopedetails");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shaadi<span className="text-orange-500">Bio</span></h1>
        </div>
        <StepIndicator current={3} />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">{isEditing ? "Edit Family Details" : "Family Details"}</h2>
          <p className="text-gray-400 text-sm mt-1">Tell us about your family background</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {[
            { label: "Father's Name", field: "fatherName", placeholder: "e.g. Rajesh Sharma" },
            { label: "Father's Occupation", field: "fatherOccupation", placeholder: "Business / Govt. Job / Retired" },
            { label: "Mother's Name", field: "motherName", placeholder: "e.g. Sunita Sharma" },
            { label: "Mother's Occupation", field: "motherOccupation", placeholder: "Homemaker / Teacher" },
            { label: "Siblings", field: "siblings", placeholder: "1 Brother, 1 Sister" },
            { label: "Family Location", field: "familyLocation", placeholder: "Delhi / Mumbai" },
          ].map(({ label, field, placeholder }) => (
            <div key={field} className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
              <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{label}</label>
              <input type="text" placeholder={placeholder} value={data[field]}
                onChange={e => handleChange(field, e.target.value)}
                className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
              {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* Family Type */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Family Type</label>
            <select value={data.familyType} onChange={e => handleChange("familyType", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select</option>
              <option>Nuclear</option><option>Joint</option>
            </select>
            {errors.familyType && <p className="text-red-400 text-xs mt-1">{errors.familyType}</p>}
          </div>

          {/* Family Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Family Status</label>
            <select value={data.familyStatus} onChange={e => handleChange("familyStatus", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select</option>
              <option>Middle Class</option><option>Upper Middle Class</option><option>Affluent</option>
            </select>
          </div>

        </div>

        <button onClick={handleNext} disabled={saving}
          className="mt-10 w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-lg transition disabled:opacity-60">
          {saving ? "Saving..." : isEditing ? "Save & Back to Preview ✓" : "Next → Horoscope Details"}
        </button>
      </div>
    </div>
  );
}
