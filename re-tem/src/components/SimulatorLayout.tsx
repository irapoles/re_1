interface SimulatorLayoutProps {
  step: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
}

export default function SimulatorLayout({
  step,
  totalSteps,
  onBack,
  onNext,
}: SimulatorLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-8 py-5">
        <span className="text-lg font-bold tracking-tight text-gray-900">
          CompanyLogo
        </span>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-500">
            שלב {step} מתוך {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            by <span className="font-semibold text-gray-700">CompanyLogo</span>
          </span>
        </div>
      </header>

      {/* Progress pills */}
      <div className="flex shrink-0 items-center justify-center gap-2 bg-gray-900 py-3">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={`block h-1.5 rounded-full transition-all duration-300 ${
              i + 1 === step ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Simulator iframe */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src="https://www.coohom.com/pub/modelo/viewer/preview/3FO3BSH6XY0I"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        />
      </div>

      {/* Footer nav */}
      <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-gray-100 bg-white px-8 py-5">
        {onBack && (
          <button
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 active:bg-gray-100"
          >
            חזור
          </button>
        )}
        <button
          onClick={onNext}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
        >
          סיום
          <span aria-hidden="true">✓</span>
        </button>
      </footer>
    </div>
  );
}
