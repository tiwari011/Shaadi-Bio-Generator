import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { saveProfile } from "../../utils/saveProfile";
import StepIndicator from "../StepIndicator";

export default function EducationDetails({ initialData = {}, isEditing, onEditDone }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    highestEducation: initialData.highestEducation || "",
    degree: initialData.degree || "",
    college: initialData.college || "",
    profession: initialData.profession || "",
    company: initialData.company || "",
    income: initialData.income || "",
    workLocation: initialData.workLocation || "",
    workType: initialData.workType || "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!data.highestEducation) e.highestEducation = "Education is required";
    if (!data.profession) e.profession = "Profession is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    setSaving(true);
    await saveProfile(auth.currentUser.uid, "education", data);
    setSaving(false);
    if (isEditing) { onEditDone(); return; }
    navigate("/familydetails");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shaadi<span className="text-orange-500">Bio</span></h1>
        </div>
        <StepIndicator current={2} />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">{isEditing ? "Edit Education Details" : "Education & Profession"}</h2>
          <p className="text-gray-400 text-sm mt-1">Your academic and professional background</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Highest Education */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Highest Education</label>
            <select value={data.highestEducation} onChange={e => handleChange("highestEducation", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select</option>
              <option>High School</option><option>Diploma</option><option>Bachelor's Degree</option>
              <option>Master's Degree</option><option>PhD</option><option>CA/CS</option><option>MBBS/MD</option>
            </select>
            {errors.highestEducation && <p className="text-red-400 text-xs mt-1">{errors.highestEducation}</p>}
          </div>

          {/* Degree */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Degree / Specialization</label>
            <input type="text" placeholder="B.Tech Computer Science / MBA Finance" value={data.degree}
              onChange={e => handleChange("degree", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* College */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">College / University</label>
            <input type="text" placeholder="Delhi University" value={data.college}
              onChange={e => handleChange("college", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Profession */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Profession</label>
            <input type="text" placeholder="Software Engineer" value={data.profession}
              onChange={e => handleChange("profession", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
            {errors.profession && <p className="text-red-400 text-xs mt-1">{errors.profession}</p>}
          </div>

          {/* Company */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Company / Organization</label>
            <input type="text" placeholder="Google / TCS / Own Business" value={data.company}
              onChange={e => handleChange("company", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Income */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Annual Income</label>
            <select value={data.income} onChange={e => handleChange("income", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select Range</option>
              <option>Below 3 LPA</option><option>3-5 LPA</option><option>5-10 LPA</option>
              <option>10-15 LPA</option><option>15-25 LPA</option><option>25+ LPA</option>
            </select>
          </div>

          {/* Work Location */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Work Location</label>
            <input type="text" placeholder="Bangalore / Remote" value={data.workLocation}
              onChange={e => handleChange("workLocation", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Work Type */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Work Type</label>
            <select value={data.workType} onChange={e => handleChange("workType", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select</option>
              <option>Private Job</option><option>Government Job</option>
              <option>Business / Self Employed</option><option>Not Working</option>
            </select>
          </div>

        </div>

        <button onClick={handleNext} disabled={saving}
          className="mt-10 w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-lg transition disabled:opacity-60">
          {saving ? "Saving..." : isEditing ? "Save & Back to Preview ✓" : "Next → Family Details"}
        </button>
      </div>
    </div>
  );
}
