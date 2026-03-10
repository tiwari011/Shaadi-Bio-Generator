import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { differenceInYears } from "date-fns";
import { auth } from "../../firebase";
import { saveProfile } from "../../utils/saveProfile";
import StepIndicator from "../StepIndicator";

export default function PersonalDetails({ initialData = {}, isEditing, onEditDone }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: initialData.fullName || "",
    dob: initialData.dob || "",
    age: initialData.age || "",
    gender: initialData.gender || "",
    height: initialData.height || "",
    maritalStatus: initialData.maritalStatus || "",
    nationality: initialData.nationality || "Indian",
    religion: initialData.religion || "",
    caste: initialData.caste || "",
    complexion: initialData.complexion || "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleDob = (e) => {
    const dob = e.target.value;
    const age = dob ? differenceInYears(new Date(), new Date(dob)) : "";
    setData(prev => ({ ...prev, dob, age }));
  };

  const validate = () => {
    const e = {};
    if (!data.fullName) e.fullName = "Name is required";
    if (!data.dob) e.dob = "Date of birth is required";
    if (!data.gender) e.gender = "Gender is required";
    if (!data.maritalStatus) e.maritalStatus = "Marital status is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    setSaving(true);
    await saveProfile(auth.currentUser.uid, "personal", data);
    setSaving(false);
    if (isEditing) { onEditDone(); return; }
    navigate("/contactdetails");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shaadi<span className="text-orange-500">Bio</span></h1>
        </div>
        <StepIndicator current={0} />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">{isEditing ? "Edit Personal Details" : "Personal Details"}</h2>
          <p className="text-gray-400 text-sm mt-1">Tell us about yourself</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {[
            { label: "Full Name", field: "fullName", type: "text", placeholder: "e.g. Priya Sharma" },
            { label: "Religion", field: "religion", type: "text", placeholder: "e.g. Hindu" },
            { label: "Caste", field: "caste", type: "text", placeholder: "e.g. Brahmin" },
            { label: "Nationality", field: "nationality", type: "text", placeholder: "Indian" },
          ].map(({ label, field, type, placeholder }) => (
            <div key={field} className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
              <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{label}</label>
              <input type={type} placeholder={placeholder} value={data[field]}
                onChange={e => handleChange(field, e.target.value)}
                className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
              {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}

          {/* DOB */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Date of Birth</label>
            <input type="date" value={data.dob} max={new Date().toISOString().split("T")[0]} onChange={handleDob}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
            {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
          </div>

          {/* Age Auto */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl shadow-md p-5">
            <label className="text-xs uppercase tracking-wider text-orange-100">Age (Auto Calculated)</label>
            <div className="mt-2 text-3xl font-bold">{data.age ? `${data.age} yrs` : "—"}</div>
          </div>

          {/* Gender */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Gender</label>
            <select value={data.gender} onChange={e => handleChange("gender", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select Gender</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
            {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Marital Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Marital Status</label>
            <select value={data.maritalStatus} onChange={e => handleChange("maritalStatus", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select</option>
              <option>Never Married</option><option>Divorced</option><option>Widowed</option><option>Awaiting Divorce</option>
            </select>
            {errors.maritalStatus && <p className="text-red-400 text-xs mt-1">{errors.maritalStatus}</p>}
          </div>

          {/* Height */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Height</label>
            <select value={data.height} onChange={e => handleChange("height", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select Height</option>
              {["4'6\"","4'8\"","4'10\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\""].map(h => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </div>

          {/* Complexion */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Complexion</label>
            <select value={data.complexion} onChange={e => handleChange("complexion", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select</option>
              <option>Fair</option><option>Wheatish</option><option>Wheatish Brown</option><option>Dark</option>
            </select>
          </div>

        </div>

        <button onClick={handleNext} disabled={saving}
          className="mt-10 w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-lg transition disabled:opacity-60">
          {saving ? "Saving..." : isEditing ? "Save & Back to Preview ✓" : "Next → Contact Details"}
        </button>
      </div>
    </div>
  );
}
