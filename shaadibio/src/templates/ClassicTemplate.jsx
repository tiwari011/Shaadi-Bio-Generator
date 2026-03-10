import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { getProfile } from "../../utils/saveProfile";

const Row = ({ label, value }) => value ? (
  <div className="flex gap-2 py-1.5 border-b border-orange-50 last:border-0">
    <span className="text-xs font-semibold text-orange-500 w-36 shrink-0">{label}</span>
    <span className="text-xs text-gray-700">{value}</span>
  </div>
) : null;

export default function ClassicTemplate() {
  const navigate = useNavigate();
  const printRef = useRef();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile(auth.currentUser.uid).then(setProfile);
  }, []);

  const handlePDF = () => {
    window.print();
  };

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="text-orange-500 animate-pulse font-semibold">Loading template...</div>
    </div>
  );

  const p = profile.personal || {};
  const c = profile.contact || {};
  const e = profile.education || {};
  const f = profile.family || {};
  const h = profile.horoscope || {};

  return (
    <div className="min-h-screen bg-orange-50 p-6">

      {/* Action bar - hidden on print */}
      <div className="max-w-2xl mx-auto mb-6 flex gap-3 print:hidden">
        <button onClick={() => navigate("/preview")}
          className="px-5 py-2 border border-orange-300 text-orange-500 rounded-full text-sm font-medium hover:bg-white transition">
          ← Back to Preview
        </button>
        <button onClick={() => navigate("/template/modern")}
          className="px-5 py-2 border border-orange-300 text-orange-500 rounded-full text-sm font-medium hover:bg-white transition">
          Switch to Modern
        </button>
        <button onClick={handlePDF}
          className="ml-auto px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full text-sm font-semibold hover:shadow-md transition">
          📥 Download PDF
        </button>
      </div>

      {/* Template */}
      <div ref={printRef} className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-orange-200">

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-rose-400 p-8 text-center text-white relative">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)"}}></div>
          <div className="relative">
            <div className="text-xs tracking-widest uppercase mb-2 opacity-80">✦ Marriage Biodata ✦</div>
            {profile.photo?.photoURL && (
              <img src={profile.photo.photoURL} alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-4" />
            )}
            <h1 className="text-3xl font-bold">{p.fullName || "Your Name"}</h1>
            {p.age && <p className="text-orange-100 mt-1 text-sm">{p.age} Years • {p.religion} • {p.caste}</p>}
          </div>
        </div>

        <div className="p-8 space-y-6">

          {/* Personal */}
          <div>
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-orange-300 inline-block"></span> Personal Details <span className="flex-1 h-0.5 bg-orange-100 inline-block"></span>
            </h2>
            <Row label="Date of Birth" value={p.dob} />
            <Row label="Age" value={p.age ? `${p.age} Years` : ""} />
            <Row label="Gender" value={p.gender} />
            <Row label="Height" value={p.height} />
            <Row label="Complexion" value={p.complexion} />
            <Row label="Marital Status" value={p.maritalStatus} />
            <Row label="Nationality" value={p.nationality} />
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-orange-300 inline-block"></span> Contact Details <span className="flex-1 h-0.5 bg-orange-100 inline-block"></span>
            </h2>
            <Row label="Phone" value={c.phone} />
            {!c.hideEmail && <Row label="Email" value={c.email} />}
            <Row label="Address" value={[c.address, c.city, c.state, c.pincode].filter(Boolean).join(", ")} />
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-orange-300 inline-block"></span> Education & Profession <span className="flex-1 h-0.5 bg-orange-100 inline-block"></span>
            </h2>
            <Row label="Education" value={`${e.highestEducation || ""} ${e.degree ? `(${e.degree})` : ""}`} />
            <Row label="College" value={e.college} />
            <Row label="Profession" value={e.profession} />
            <Row label="Company" value={e.company} />
            <Row label="Annual Income" value={e.income} />
            <Row label="Work Location" value={e.workLocation} />
          </div>

          {/* Family */}
          <div>
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-orange-300 inline-block"></span> Family Details <span className="flex-1 h-0.5 bg-orange-100 inline-block"></span>
            </h2>
            <Row label="Father's Name" value={`${f.fatherName || ""} ${f.fatherOccupation ? `(${f.fatherOccupation})` : ""}`} />
            <Row label="Mother's Name" value={`${f.motherName || ""} ${f.motherOccupation ? `(${f.motherOccupation})` : ""}`} />
            <Row label="Siblings" value={f.siblings} />
            <Row label="Family Type" value={f.familyType} />
            <Row label="Family Status" value={f.familyStatus} />
            <Row label="Family Location" value={f.familyLocation} />
          </div>

          {/* Horoscope */}
          <div>
            <h2 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-orange-300 inline-block"></span> Horoscope Details <span className="flex-1 h-0.5 bg-orange-100 inline-block"></span>
            </h2>
            <Row label="Rashi" value={h.rashi} />
            <Row label="Nakshatra" value={h.nakshatra} />
            <Row label="Gotra" value={h.gotra} />
            <Row label="Manglik" value={h.manglik} />
            <Row label="Place of Birth" value={h.placeOfBirth} />
            <Row label="Time of Birth" value={h.timeOfBirth} />
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-orange-50 to-rose-50 border-t border-orange-100 p-4 text-center">
          <p className="text-xs text-orange-400 font-medium tracking-wider">✦ Created with ShaadiBio ✦</p>
        </div>

      </div>

      <style>{`@media print { .print\\:hidden { display: none !important; } }`}</style>
    </div>
  );
}
