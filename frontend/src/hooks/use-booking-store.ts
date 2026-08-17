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
        
        // Convert local data to CreateBookingDto format
        const payload = {
          serviceId: data.serviceId,
          packageId: data.packageId,
          addonIds: data.addonIds || [],
          scheduledDate: data.datetime, // Assuming datetime contains the full date string
          startTime: "10:00", // Hardcoded mock for now since Step5 doesn't fully capture exact time string yet
          endTime: "14:00", 
          timeFlexibility: data.timeFlexibility || 'STRICT',
          extraHoursBooked: data.extraHoursBooked || 0,
          location: {
            address: "123 Main St", // Hardcoded mock since Step4 Location UI is just a placeholder right now
            pincode: "700001",
            city: "Kolkata"
          }
        };

        const { fetchApi } = await import('@/lib/api');
        
        try {
          const response = await fetchApi('/bookings', {
            method: 'POST',
            body: JSON.stringify(payload),
          });
          console.log('Booking Successful:', response);
          return response;
        } catch (error) {
          console.error('Booking Failed:', error);
          throw error;
        }
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
