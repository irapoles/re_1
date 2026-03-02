import Image from "next/image";
import { ReactNode } from "react";

interface SplitLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
  backDisabled?: boolean;
  onNext?: () => void;
  nextDisabled?: boolean;
  step?: number;
  totalSteps?: number;
}

export default function SplitLayout({
  title,
  subtitle,
  children,
  onBack,
  backDisabled = false,
  onNext,
  nextDisabled = false,
  step = 1,
  totalSteps = 6,
}: SplitLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      {/* Left panel — image */}
      <div className="relative hidden md:flex md:w-1/2 md:flex-col md:items-center md:justify-center">
        <Image
          src="/background-sky.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text */}
        <div className="relative z-10 px-12 text-center text-white">
          <h1 className="text-4xl font-bold leading-tight">{title}</h1>
          {subtitle && (
            <p className="mt-3 text-base text-white/80">{subtitle}</p>
          )}
        </div>

        {/* Progress indicators */}
        <div className="absolute bottom-10 left-0 right-0 z-10 flex items-center justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i + 1 === step
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right panel — content */}
      <div className="flex flex-1 flex-col bg-white md:w-1/2">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5">
          <span className="text-lg font-bold tracking-tight text-gray-900">
            CompanyLogo
          </span>
          <span className="text-sm text-gray-500">
            by{" "}
            <span className="font-semibold text-gray-700">CompanyLogo</span>
          </span>
        </header>

        {/* Content */}
        <main className="flex flex-1 items-center justify-center px-8">
          {children}
        </main>

        {/* Navigation */}
        <footer className="flex items-center justify-end gap-3 px-8 py-6">
          {onBack && (
            <button
              onClick={backDisabled ? undefined : onBack}
              disabled={backDisabled}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:hover:bg-white"
            >
              חזור
            </button>
          )}
          <button
            onClick={nextDisabled ? undefined : onNext}
            disabled={nextDisabled}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            הבא
            <span aria-hidden="true">←</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
