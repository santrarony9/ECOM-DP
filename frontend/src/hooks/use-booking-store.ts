import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BookingData {
  serviceId?: string;
  packageId?: string;
  addonIds?: string[];
  location?: string;
  datetime?: string;
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
  timeFlexibility?: 'STRICT' | 'FLEXIBLE';
  extraHoursBooked?: number;
}

interface BookingState {
  currentStep: number;
  data: BookingData;
  setStep: (step: number) => void;
  updateData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitBooking: () => Promise<void>;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      data: {},
      setStep: (step) => set({ currentStep: step }),
      updateData: (newData) => set((state) => ({ data: { ...state.data, ...newData } })),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 8) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
      submitBooking: async () => {
        const { data } = get();
        console.log('Submitting booking to backend API:', data);
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        });
      },
    }),
    {
      name: 'booking-storage',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.sessionStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      ),
    }
  )
);
