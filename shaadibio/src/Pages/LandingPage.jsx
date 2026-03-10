import { useNavigate } from "react-router-dom";

const steps = [
  { icon: "👤", title: "Personal Details", desc: "Name, DOB, gender, height & more" },
  { icon: "📞", title: "Contact Details", desc: "Phone, email with privacy options" },
  { icon: "🎓", title: "Education & Profession", desc: "Degree, job & income details" },
  { icon: "👨‍👩‍👧", title: "Family Details", desc: "Parents, siblings & family background" },
  { icon: "🔯", title: "Horoscope Details", desc: "Rashi, Nakshatra, Gotra & birth info" },
];

const templates = [
  { name: "Classic Elegance", color: "from-orange-400 to-rose-400", desc: "Traditional Indian style with ornate borders" },
  { name: "Modern Minimal", color: "from-slate-600 to-orange-500", desc: "Clean, contemporary professional layout" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 font-sans">

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Shaadi<span className="text-orange-500">Bio</span>
        </h1>
        <div className="flex gap-3">
          <button onClick={() => navigate("/login")}
            className="px-5 py-2 text-orange-500 border border-orange-300 rounded-full font-medium hover:bg-orange-50 transition text-sm">
            Login
          </button>
          <button onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-medium hover:shadow-md transition text-sm">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
          🇮🇳 India's Smartest Biodata Builder
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight max-w-3xl mx-auto">
          Create Your Perfect
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500"> Marriage Biodata </span>
          in Minutes
        </h2>
        <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto">
          Fill 5 simple steps, choose a beautiful template, and download your biodata as a PDF — all for free.
        </p>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <button onClick={() => navigate("/signup")}
            className="px-8 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition">
            Create My Biodata →
          </button>
          <button onClick={() => navigate("/login")}
            className="px-8 py-4 border border-orange-300 text-orange-500 rounded-full font-semibold text-lg hover:bg-orange-50 transition">
            Login
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[["5 Steps", "Simple Process"], ["2 Templates", "Beautiful Designs"], ["~5 Mins", "Time to Complete"]].map(([val, label]) => (
            <div key={label} className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4">
              <div className="text-2xl font-bold text-orange-500">{val}</div>
              <div className="text-xs text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800">How It Works</h3>
            <p className="text-gray-400 mt-2">Just 5 steps to your perfect biodata</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="text-center p-5 rounded-2xl border border-orange-100 hover:shadow-md hover:border-orange-300 transition bg-orange-50/40">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-bold text-orange-500 mb-1">Step {i + 1}</div>
                <div className="font-semibold text-gray-700 text-sm">{s.title}</div>
                <div className="text-xs text-gray-400 mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-3">Choose Your Template</h3>
          <p className="text-gray-400 mb-10">Two professionally designed templates — download as PDF instantly</p>
          <div className="grid md:grid-cols-2 gap-6">
            {templates.map((t, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md border border-orange-100 hover:shadow-xl transition">
                <div className={`h-32 bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                  <span className="text-white text-4xl font-bold opacity-30">BIODATA</span>
                </div>
                <div className="p-5 bg-white">
                  <div className="font-bold text-gray-800">{t.name}</div>
                  <div className="text-sm text-gray-400 mt-1">{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-orange-400 to-rose-400">
        <h3 className="text-3xl font-bold text-white mb-4">Ready to Create Your Biodata?</h3>
        <p className="text-orange-100 mb-8">Join thousands who've created their biodata with ShaadiBio</p>
        <button onClick={() => navigate("/signup")}
          className="px-10 py-4 bg-white text-orange-500 font-bold rounded-full text-lg hover:shadow-xl transition">
          Get Started Free →
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm bg-white border-t border-orange-100">
        © 2025 ShaadiBio — Made with ❤️ for Indian families
      </footer>

    </div>
  );
}
