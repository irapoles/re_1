"use client";

import { useState } from "react";
import SplitLayout from "@/src/components/SplitLayout";
import OptionList from "@/src/components/OptionList";
import ApartmentTypePicker from "@/src/components/ApartmentTypePicker";
import SimulatorLayout from "@/src/components/SimulatorLayout";

const SIZE_OPTIONS = [
  { id: "90", label: '90 מ"ר' },
  { id: "120", label: '120 מ"ר' },
  { id: "140", label: '140 מ"ר' },
  { id: "160", label: '160 מ"ר' },
];

const ROOM_OPTIONS = [
  { id: "3", label: "3" },
  { id: "4", label: "4" },
  { id: "5", label: "5" },
  { id: "6", label: "6" },
];

const FLOOR_OPTIONS = [
  { id: "floor-5", label: "קומה 5" },
  { id: "floor-8", label: "קומה 8" },
  { id: "floor-9", label: "קומה 9" },
  { id: "floor-10", label: "קומה 10" },
];

const TYPE_OPTIONS = [
  { id: "type-1", label: "טיפוס 1", imageSrc: "/type1.png" },
  { id: "type-2", label: "טיפוס 2", imageSrc: "/type2.png" },
];

const STEPS = [
  { title: "בחרו גודל רצוי לדירה", subtitle: "ניתן לבחור יותר מאפשרות אחת" },
  { title: "כמה חדרים אתם מחפשים?", subtitle: "ניתן לבחור יותר מאפשרות אחת" },
  { title: "איזו קומה תעדיפו?", subtitle: "ניתן לבחור מאפשרות אחת" },
  { title: "בחרו תכנית לדירה", subtitle: "ניתן לבחור אפשרות אחת" },
  { title: "סימולטור תלת-ממד", subtitle: "" },
];

const TOTAL_STEPS = STEPS.length;

export default function FindPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSizeIds, setSelectedSizeIds] = useState<string[]>([]);
  const [selectedRoomsIds, setSelectedRoomsIds] = useState<string[]>([]);
  const [selectedFloorIds, setSelectedFloorIds] = useState<string[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

  const canGoNext =
    currentStep === 1
      ? selectedSizeIds.length > 0
      : currentStep === 2
        ? selectedRoomsIds.length > 0
        : currentStep === 3
          ? selectedFloorIds.length > 0
          : currentStep === 4
            ? !!selectedTypeId
            : true; // simulator step — always allow finish

  const { title, subtitle } = STEPS[currentStep - 1];

  function handleNext() {
    if (!canGoNext) return;
    if (currentStep < 5) {
      setCurrentStep((s) => s + 1);
    } else {
      console.log({ selectedSizeIds, selectedRoomsIds, selectedFloorIds, selectedTypeId });
      alert("תודה! הבקשה נשלחה בהצלחה.");
    }
  }

  function handleBack() {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  }

  function renderOptions() {
    if (currentStep === 1)
      return (
        <OptionList
          options={SIZE_OPTIONS}
          selectedIds={selectedSizeIds}
          onChange={setSelectedSizeIds}
        />
      );
    if (currentStep === 2)
      return (
        <OptionList
          options={ROOM_OPTIONS}
          selectedIds={selectedRoomsIds}
          onChange={setSelectedRoomsIds}
        />
      );
    if (currentStep === 3)
      return (
        <OptionList
          options={FLOOR_OPTIONS}
          selectedIds={selectedFloorIds}
          onChange={setSelectedFloorIds}
        />
      );
    return (
      <ApartmentTypePicker
        options={TYPE_OPTIONS}
        selectedId={selectedTypeId}
        onChange={setSelectedTypeId}
      />
    );
  }

  if (currentStep === 5) {
    return (
      <SimulatorLayout
        step={currentStep}
        totalSteps={TOTAL_STEPS}
        onBack={handleBack}
        onNext={handleNext}
      />
    );
  }

  return (
    <SplitLayout
      title={title}
      subtitle={subtitle}
      step={currentStep}
      totalSteps={TOTAL_STEPS}
      onBack={handleBack}
      backDisabled={currentStep === 1}
      onNext={handleNext}
      nextDisabled={!canGoNext}
    >
      {renderOptions()}
    </SplitLayout>
  );
}
