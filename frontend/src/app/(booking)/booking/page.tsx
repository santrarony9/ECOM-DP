"use client";

import { useBookingStore } from '@/hooks/use-booking-store';
import { Step1Services } from '@/components/booking/Step1Services';
import { Step2Packages } from '@/components/booking/Step2Packages';
import { Step3Addons } from '@/components/booking/Step3Addons';
import { Step4Location } from '@/components/booking/Step4Location';
import { Step5DateTime } from '@/components/booking/Step5DateTime';
import { Step6Customer } from '@/components/booking/Step6Customer';
import { Step7Payment } from '@/components/booking/Step7Payment';
import { Step8Confirmation } from '@/components/booking/Step8Confirmation';

export default function BookingPage() {
  const currentStep = useBookingStore((state) => state.currentStep);

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border mb-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">Step {currentStep} of 8</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-black h-2 rounded-full transition-all duration-300" style={{ width: `${(currentStep / 8) * 100}%` }}></div>
        </div>
      </div>

      {currentStep === 1 && <Step1Services />}
      {currentStep === 2 && <Step2Packages />}
      {currentStep === 3 && <Step3Addons />}
      {currentStep === 4 && <Step4Location />}
      {currentStep === 5 && <Step5DateTime />}
      {currentStep === 6 && <Step6Customer />}
      {currentStep === 7 && <Step7Payment />}
      {currentStep === 8 && <Step8Confirmation />}
    </div>
  );
}
