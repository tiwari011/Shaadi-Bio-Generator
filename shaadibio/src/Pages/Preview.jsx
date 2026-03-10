import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { getProfile } from "../../utils/saveProfile";

const Section = ({ title, data, onEdit, fields }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
      <button onClick={onEdit}
        className="text-xs px-4 py-1.5 border border-orange-300 text-orange-500 rounded-full hover:bg-orange-50 transition font-medium">
        ✏️ Edit
      </button>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {fields.map(({ label, key }) => (
        data?.[key] ? (
          <div key={key}>
            <div className="text-xs text-orange-400 font-semibold uppercase tracking-wider">{label}</div>
            <div className="text-sm text-gray-700 mt-0.5 font-medium">{data[key]}</div>
          </div>
        ) : null
      ))}
    </div>
  </div>
);

export default function Preview() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile(auth.currentUser.uid).then(p => {
      setProfile(p);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-rose-50">
      <div className="text-orange-500 text-lg font-semibold animate-pulse">Loading your biodata...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shaadi<span className="text-orange-500">Bio</span></h1>
          <p className="text-gray-400 text-sm mt-1">Review your biodata before generating</p>
        </div>

        {/* Photo */}
        <div className="text-center mb-8">
          {profile?.photo?.photoURL ? (
            <img src={profile.photo.photoURL} alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-orange-300 shadow-lg mx-auto" />
          ) : (
            <div className="w-28 h-28 rounded-full bg-orange-100 border-2 border-dashed border-orange-300 flex items-center justify-center mx-auto">
              <span className="text-3xl">👤</span>
            </div>
          )}
          <button onClick={() => navigate("/uploadphoto")}
            className="mt-2 text-xs text-orange-500 hover:underline">
            {profile?.photo?.photoURL ? "Change Photo" : "Add Photo"}
          </button>
        </div>

        <div className="space-y-5">

          <Section title="👤 Personal Details" data={profile?.personal} onEdit={() => navigate("/personaldetails?edit=true")}
            fields={[
              { label: "Full Name", key: "fullName" }, { label: "Date of Birth", key: "dob" },
              { label: "Age", key: "age" }, { label: "Gender", key: "gender" },
              { label: "Height", key: "height" }, { label: "Marital Status", key: "maritalStatus" },
              { label: "Religion", key: "religion" }, { label: "Caste", key: "caste" },
              { label: "Nationality", key: "nationality" }, { label: "Complexion", key: "complexion" },
            ]}
          />

          <Section title="📞 Contact Details" data={profile?.contact} onEdit={() => navigate("/contactdetails?edit=true")}
            fields={[
              { label: "Phone", key: "phone" },
              ...(!profile?.contact?.hideEmail ? [{ label: "Email", key: "email" }] : []),
              { label: "Alternate Phone", key: "alternatePhone" },
              { label: "Address", key: "address" }, { label: "City", key: "city" },
              { label: "State", key: "state" }, { label: "Pincode", key: "pincode" },
            ]}
          />

          <Section title="🎓 Education & Profession" data={profile?.education} onEdit={() => navigate("/educationdetails?edit=true")}
            fields={[
              { label: "Highest Education", key: "highestEducation" }, { label: "Degree", key: "degree" },
              { label: "College", key: "college" }, { label: "Profession", key: "profession" },
              { label: "Company", key: "company" }, { label: "Annual Income", key: "income" },
              { label: "Work Location", key: "workLocation" }, { label: "Work Type", key: "workType" },
            ]}
          />

          <Section title="👨‍👩‍👧 Family Details" data={profile?.family} onEdit={() => navigate("/familydetails?edit=true")}
            fields={[
              { label: "Father's Name", key: "fatherName" }, { label: "Father's Occupation", key: "fatherOccupation" },
              { label: "Mother's Name", key: "motherName" }, { label: "Mother's Occupation", key: "motherOccupation" },
              { label: "Siblings", key: "siblings" }, { label: "Family Type", key: "familyType" },
              { label: "Family Status", key: "familyStatus" }, { label: "Family Location", key: "familyLocation" },
            ]}
          />

          <Section title="🔯 Horoscope Details" data={profile?.horoscope} onEdit={() => navigate("/horoscopedetails?edit=true")}
            fields={[
              { label: "Rashi", key: "rashi" }, { label: "Nakshatra", key: "nakshatra" },
              { label: "Gotra", key: "gotra" }, { label: "Manglik", key: "manglik" },
              { label: "Place of Birth", key: "placeOfBirth" }, { label: "Time of Birth", key: "timeOfBirth" },
            ]}
          />
        </div>

        <div className="mt-10 bg-white rounded-2xl border border-orange-100 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 text-lg mb-4 text-center">Choose Your Template</h3>
          <div className="grid md:grid-cols-2 gap-4">

            <button onClick={() => navigate("/template/classic")}
              className="group rounded-2xl overflow-hidden border-2 border-orange-200 hover:border-orange-500 transition shadow-sm hover:shadow-md">
              <div className="h-24 bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg opacity-60 group-hover:opacity-100 transition">CLASSIC</span>
              </div>
              <div className="p-3 bg-white">
                <div className="font-semibold text-gray-700 text-sm">Classic Elegance</div>
                <div className="text-xs text-gray-400">Traditional Indian style</div>
              </div>
            </button>

            <button onClick={() => navigate("/template/modern")}
              className="group rounded-2xl overflow-hidden border-2 border-orange-200 hover:border-orange-500 transition shadow-sm hover:shadow-md">
              <div className="h-24 bg-gradient-to-br from-slate-700 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg opacity-60 group-hover:opacity-100 transition">MODERN</span>
              </div>
              <div className="p-3 bg-white">
                <div className="font-semibold text-gray-700 text-sm">Modern Minimal</div>
                <div className="text-xs text-gray-400">Clean contemporary layout</div>
              </div>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
