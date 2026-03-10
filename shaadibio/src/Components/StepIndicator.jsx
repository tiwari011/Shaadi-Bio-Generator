const steps = ["Personal", "Contact", "Education", "Family", "Horoscope"];

export default function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
              ${i < current ? "bg-orange-500 border-orange-500 text-white" :
                i === current ? "bg-white border-orange-500 text-orange-500 shadow-md" :
                "bg-white border-orange-200 text-gray-300"}`}>
              {i < current ? "✓" : i + 1}
            </div>
            <span className={`text-xs mt-1 font-medium whitespace-nowrap
              ${i === current ? "text-orange-500" : i < current ? "text-orange-400" : "text-gray-300"}`}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-10 md:w-16 h-0.5 mx-1 mb-4 ${i < current ? "bg-orange-400" : "bg-orange-100"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
