"use client";

export interface OptionItem {
  id: string;
  label: string;
}

interface OptionListProps {
  options: OptionItem[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function OptionList({
  options,
  selectedIds,
  onChange,
}: OptionListProps) {
  function toggle(id: string) {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((s) => s !== id)
        : [...selectedIds, id]
    );
  }

  return (
    <div className="flex w-full max-w-[250px] flex-col gap-3">
      {options.map((opt) => {
        const selected = selectedIds.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            className={`w-full rounded-xl border-2 px-6 py-4 text-center text-base font-medium transition-colors
              ${
                selected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-800 hover:border-blue-300 hover:bg-blue-50"
              }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
