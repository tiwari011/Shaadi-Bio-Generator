import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { saveProfile } from "../../utils/saveProfile";
import StepIndicator from "../StepIndicator";

export default function ContactDetails({ initialData = {}, isEditing, onEditDone }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    phone: initialData.phone || "",
    email: initialData.email || "",
    hideEmail: initialData.hideEmail || false,
    alternatePhone: initialData.alternatePhone || "",
    address: initialData.address || "",
    city: initialData.city || "",
    state: initialData.state || "",
    pincode: initialData.pincode || "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!data.phone || !/^\d{10}$/.test(data.phone)) e.phone = "Valid 10-digit phone required";
    if (!data.email) e.email = "Email is required";
    if (!data.city) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    setSaving(true);
    await saveProfile(auth.currentUser.uid, "contact", data);
    setSaving(false);
    if (isEditing) { onEditDone(); return; }
    navigate("/educationdetails");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Shaadi<span className="text-orange-500">Bio</span></h1>
        </div>
        <StepIndicator current={1} />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">{isEditing ? "Edit Contact Details" : "Contact Details"}</h2>
          <p className="text-gray-400 text-sm mt-1">How can families reach you?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Phone */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Phone Number</label>
            <input type="text" placeholder="9876543210" value={data.phone}
              onChange={e => handleChange("phone", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Email Address</label>
            <input type="email" placeholder="you@example.com" value={data.email}
              onChange={e => handleChange("email", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            <div className="flex items-center mt-3">
              <input type="checkbox" checked={data.hideEmail} onChange={e => handleChange("hideEmail", e.target.checked)}
                className="w-4 h-4 text-orange-500 border-orange-300 rounded focus:ring-orange-400" />
              <label className="ml-2 text-xs text-gray-500">Hide email from biodata</label>
            </div>
          </div>

          {/* Alternate Phone */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Alternate Phone</label>
            <input type="text" placeholder="Optional" value={data.alternatePhone}
              onChange={e => handleChange("alternatePhone", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Address</label>
            <input type="text" placeholder="Street / Area / Colony" value={data.address}
              onChange={e => handleChange("address", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* City */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">City</label>
            <input type="text" placeholder="Delhi" value={data.city}
              onChange={e => handleChange("city", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
            {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
          </div>

          {/* State */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">State</label>
            <input type="text" placeholder="Uttar Pradesh" value={data.state}
              onChange={e => handleChange("state", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Pincode */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 hover:shadow-md transition">
            <label className="text-xs font-semibold text-orange-500 uppercase tracking-wider">Pincode</label>
            <input type="text" placeholder="110001" value={data.pincode}
              onChange={e => handleChange("pincode", e.target.value)}
              className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

        </div>

        <button onClick={handleNext} disabled={saving}
          className="mt-10 w-full py-4 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 hover:shadow-lg transition disabled:opacity-60">
          {saving ? "Saving..." : isEditing ? "Save & Back to Preview ✓" : "Next → Education Details"}
        </button>
      </div>
    </div>
  );
}
