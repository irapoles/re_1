"use client";

import { useFlow } from "@/src/context/FlowContext";

const SIZE_OPTIONS = [90, 120, 140, 160];

export default function ApartmentSizePicker() {
  const { flow, toggleApartmentSize } = useFlow();

  return (
    <div className="flex w-full max-w-[250px] flex-col gap-3">
      {SIZE_OPTIONS.map((size) => {
        const selected = flow.apartmentSizes.includes(size);
        return (
          <button
            key={size}
            onClick={() => toggleApartmentSize(size)}
            className={`w-full rounded-xl border-2 px-6 py-4 text-center text-base font-medium transition-colors
              ${
                selected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50"
              }`}
          >
            {size} מ&quot;ר
          </button>
        );
      })}
    </div>
  );
}
