"use client";

import Image from "next/image";

export interface ApartmentTypeOption {
  id: string;
  label: string;
  imageSrc: string;
}

interface ApartmentTypePickerProps {
  options: ApartmentTypeOption[];
  selectedId: string | null;
  onChange: (id: string | null) => void;
}

export default function ApartmentTypePicker({
  options,
  selectedId,
  onChange,
}: ApartmentTypePickerProps) {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {options.map((opt) => {
        const selected = opt.id === selectedId;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id === selectedId ? null : opt.id)}
            className={`flex items-center gap-4 rounded-xl border-2 p-2 text-right transition-colors
              ${
                selected
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50"
              }`}
          >
            <span
              className={`flex-1 pr-2 text-base font-medium ${
                selected ? "text-blue-600" : "text-gray-800"
              }`}
            >
              {opt.label}
            </span>
            <div className="relative h-[160px] w-[240px] shrink-0 overflow-hidden rounded-lg">
              <Image
                src={opt.imageSrc}
                alt={opt.label}
                fill
                className="object-cover"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
