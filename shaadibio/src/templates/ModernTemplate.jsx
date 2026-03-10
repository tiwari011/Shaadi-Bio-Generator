import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { getProfile } from "../../utils/saveProfile";

const Chip = ({ label, value }) => value ? (
  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">{label}</div>
    <div className="text-sm text-slate-700 font-semibold">{value}</div>
  </div>
) : null;

export default function ModernTemplate() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile(auth.currentUser.uid).then(setProfile);
  }, []);

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-slate-500 animate-pulse font-semibold">Loading template...</div>
    </div>
  );

  const p = profile.personal || {};
  const c = profile.contact || {};
  const e = profile.education || {};
  const f = profile.family || {};
  const h = profile.horoscope || {};

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Action bar */}
      <div className="max-w-2xl mx-auto mb-6 flex gap-3 print:hidden">
        <button onClick={() => navigate("/preview")}
          className="px-5 py-2 border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-white transition">
          ← Back to Preview
        </button>
        <button onClick={() => navigate("/template/classic")}
          className="px-5 py-2 border border-slate-300 text-slate-600 rounded-full text-sm font-medium hover:bg-white transition">
          Switch to Classic
        </button>
        <button onClick={() => window.print()}
          className="ml-auto px-6 py-2 bg-gradient-to-r from-slate-700 to-orange-500 text-white rounded-full text-sm font-semibold hover:shadow-md transition">
          📥 Download PDF
        </button>
      </div>

      {/* Template */}
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">

        {/* Sidebar-style header */}
        <div className="flex bg-gradient-to-br from-slate-800 to-slate-700 text-white p-8 gap-6 items-center">
          {profile.photo?.photoURL ? (
            <img src={profile.photo.photoURL} alt="profile"
              className="w-24 h-24 rounded-2xl object-cover border-2 border-orange-400 shadow-lg shrink-0" />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-slate-600 flex items-center justify-center text-3xl shrink-0">👤</div>
          )}
          <div>
            <div className="text-xs text-orange-400 font-semibold tracking-widest uppercase mb-1">Marriage Biodata</div>
            <h1 className="text-2xl font-bold">{p.fullName || "Your Name"}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {p.age && <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{p.age} yrs</span>}
              {p.religion && <span className="bg-slate-600 text-slate-200 text-xs px-2 py-0.5 rounded-full">{p.religion}</span>}
              {p.maritalStatus && <span className="bg-slate-600 text-slate-200 text-xs px-2 py-0.5 rounded-full">{p.maritalStatus}</span>}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">

          {/* Personal */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-sm">👤</div>
              <h2 className="font-bold text-slate-800">Personal Details</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Chip label="Date of Birth" value={p.dob} />
              <Chip label="Gender" value={p.gender} />
              <Chip label="Height" value={p.height} />
              <Chip label="Complexion" value={p.complexion} />
              <Chip label="Nationality" value={p.nationality} />
              <Chip label="Caste" value={p.caste} />
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-sm">📞</div>
              <h2 className="font-bold text-slate-800">Contact Details</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Chip label="Phone" value={c.phone} />
              {!c.hideEmail && <Chip label="Email" value={c.email} />}
              <Chip label="City" value={c.city} />
              <Chip label="State" value={c.state} />
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-sm">🎓</div>
              <h2 className="font-bold text-slate-800">Education & Profession</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Chip label="Education" value={e.highestEducation} />
              <Chip label="Degree" value={e.degree} />
              <Chip label="College" value={e.college} />
              <Chip label="Profession" value={e.profession} />
              <Chip label="Company" value={e.company} />
              <Chip label="Income" value={e.income} />
              <Chip label="Work Type" value={e.workType} />
              <Chip label="Work Location" value={e.workLocation} />
            </div>
          </div>

          {/* Family */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-sm">👨‍👩‍👧</div>
              <h2 className="font-bold text-slate-800">Family Details</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Chip label="Father" value={f.fatherName} />
              <Chip label="Father's Work" value={f.fatherOccupation} />
              <Chip label="Mother" value={f.motherName} />
              <Chip label="Mother's Work" value={f.motherOccupation} />
              <Chip label="Siblings" value={f.siblings} />
              <Chip label="Family Type" value={f.familyType} />
              <Chip label="Family Status" value={f.familyStatus} />
              <Chip label="Family Location" value={f.familyLocation} />
            </div>
          </div>

          {/* Horoscope */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-sm">🔯</div>
              <h2 className="font-bold text-slate-800">Horoscope Details</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Chip label="Rashi" value={h.rashi} />
              <Chip label="Nakshatra" value={h.nakshatra} />
              <Chip label="Gotra" value={h.gotra} />
              <Chip label="Manglik" value={h.manglik} />
              <Chip label="Place of Birth" value={h.placeOfBirth} />
              <Chip label="Time of Birth" value={h.timeOfBirth} />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 text-center">
          <p className="text-xs text-slate-400 tracking-wider">Created with <span className="text-orange-400 font-semibold">ShaadiBio</span></p>
        </div>

      </div>

      <style>{`@media print { .print\\:hidden { display: none !important; } }`}</style>
    </div>
  );
}
