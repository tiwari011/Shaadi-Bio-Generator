import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { saveProfile } from "../../utils/saveProfile";
import StepIndicator from "../StepIndicator";

const rashiList = ["Mesh (Aries)","Vrishabh (Taurus)","Mithun (Gemini)","Kark (Cancer)","Simha (Leo)","Kanya (Virgo)","Tula (Libra)","Vrishchik (Scorpio)","Dhanu (Sagittarius)","Makar (Capricorn)","Kumbh (Aquarius)","Meen (Pisces)"];
const nakshatraList = ["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishtha","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];

export default function HoroscopeDetails({ initialData = {}, isEditing, onEditDone }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    rashi: initialData.rashi || "",
    nakshatra: initialData.nakshatra || "",
    gotra: initialData.gotra || "",
    manglik: initialData.manglik || "",
    placeOfBirth: initialData.placeOfBirth || "",
    timeOfBirth: initialData.timeOfBirth || "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!data.rashi) e.rashi = "Rashi is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    setSaving(true);
    await saveProfile(auth.currentUser.uid, "horoscope", data);
    setSaving(false);
    if (isEditing) { onEditDone(); return; }
    navigate("/uploadphoto");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shaadi<span className="text-orange-500">Bio</span></h1>
        </div>
        <StepIndicator current={4} />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">{isEditing ? "Edit Horoscope Details" : "Horoscope Details"}</h2>
          <p className="text-gray-400 text-sm mt-1">Astrological information for the biodata</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Rashi */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Rashi (Moon Sign) ✦</label>
            <select value={data.rashi} onChange={e => handleChange("rashi", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select Rashi</option>
              {rashiList.map(r => <option key={r}>{r}</option>)}
            </select>
            {errors.rashi && <p className="text-red-400 text-xs mt-1">{errors.rashi}</p>}
          </div>

          {/* Nakshatra */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Nakshatra (Birth Star)</label>
            <select value={data.nakshatra} onChange={e => handleChange("nakshatra", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select Nakshatra</option>
              {nakshatraList.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>

          {/* Gotra */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Gotra</label>
            <input type="text" placeholder="e.g. Kashyap / Bharadwaj" value={data.gotra}
              onChange={e => handleChange("gotra", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Manglik */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Manglik</label>
            <select value={data.manglik} onChange={e => handleChange("manglik", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm">
              <option value="">Select</option>
              <option>Yes</option><option>No</option><option>Anshik Manglik</option><option>Don't Know</option>
            </select>
          </div>

          {/* Place of Birth */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Place of Birth</label>
            <input type="text" placeholder="e.g. Delhi, India" value={data.placeOfBirth}
              onChange={e => handleChange("placeOfBirth", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Time of Birth */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Time of Birth</label>
            <input type="time" value={data.timeOfBirth}
              onChange={e => handleChange("timeOfBirth", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

        </div>

        <button onClick={handleNext} disabled={saving}
          className="mt-10 w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-lg transition disabled:opacity-60">
          {saving ? "Saving..." : isEditing ? "Save & Back to Preview ✓" : "Next → Upload Photo"}
        </button>
      </div>
    </div>
  );
}
