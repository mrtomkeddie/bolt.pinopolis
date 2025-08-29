import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Booking {
  id: string;
  activity: 'bowling' | 'ar-darts' | 'soft-play';
  date: string;
  time: string;
  guests: {
    adults?: number;
    children?: number;
  };
  details: {
    games?: number;
    lanes?: number;
    duration?: number;
    softPlayAddon?: boolean;
  };
  email: string;
  totalPrice: number;
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => string;
  cancelBooking: (id: string) => void;
  getBookingsByEmail: (email: string) => Booking[];
  generateTimeSlots: (date: string) => string[];
  isTimeSlotAvailable: (date: string, time: string, activity: string) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('pinopolisBookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pinopolisBookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): string => {
    const id = `PIN-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`.toUpperCase();
    const newBooking: Booking = {
      ...bookingData,
      id,
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
    return id;
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const getBookingsByEmail = (email: string) => {
    return bookings.filter(booking => booking.email.toLowerCase() === email.toLowerCase());
  };

  const generateTimeSlots = (date: string): string[] => {
    const slots = [];
    for (let hour = 10; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const isTimeSlotAvailable = (date: string, time: string, activity: string): boolean => {
    const existingBookings = bookings.filter(
      booking => booking.date === date && booking.time === time && booking.activity === activity
    );
    
    // Simple availability logic - max 3 bookings per slot per activity
    return existingBookings.length < 3;
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      cancelBooking,
      getBookingsByEmail,
      generateTimeSlots,
      isTimeSlotAvailable
    }}>
      {children}
    </BookingContext.Provider>
  );
};