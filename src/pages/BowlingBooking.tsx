import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Calendar, Clock, Users, Zap, Check, AlertCircle } from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';

const BowlingBooking: React.FC = () => {
  const { addBooking, generateTimeSlots, isTimeSlotAvailable } = useBooking();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    adults: 2,
    children: 0,
    games: 1,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingConfirmed, setBookingConfirmed] = useState<string>('');

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (formData.adults + formData.children < 1) {
        newErrors.guests = 'At least one guest is required';
      }
      if (formData.adults + formData.children > 8) {
        newErrors.guests = 'Maximum 8 guests per lane';
      }
      if (formData.games < 1 || formData.games > 5) {
        newErrors.games = 'Please select 1-5 games';
      }
    }

    if (stepNumber === 2) {
      if (!formData.date) {
        newErrors.date = 'Please select a date';
      }
      if (!formData.time) {
        newErrors.time = 'Please select a time slot';
      }
    }

    if (stepNumber === 3) {
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const calculatePrice = () => {
    const basePrice = 15; // per game per person
    const totalGuests = formData.adults + formData.children;
    const gamesPrice = basePrice * formData.games * totalGuests;
    
    // Children discount
    const childDiscount = formData.children * basePrice * formData.games * 0.3;
    
    return gamesPrice - childDiscount;
  };

  const handleBooking = () => {
    if (validateStep(3)) {
      const lanes = Math.ceil((formData.adults + formData.children) / 6);
      const bookingId = addBooking({
        activity: 'bowling',
        date: formData.date,
        time: formData.time,
        guests: {
          adults: formData.adults,
          children: formData.children
        },
        details: {
          games: formData.games,
          lanes: lanes
        },
        email: formData.email,
        totalPrice: calculatePrice()
      });
      setBookingConfirmed(bookingId);
    }
  };

  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = addDays(new Date(), i);
    return format(date, 'yyyy-MM-dd');
  });

  const timeSlots = generateTimeSlots(formData.date);

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-elevated p-12">
            <div className="w-24 h-24 bg-[hsl(var(--success))] rounded-full flex items-center justify-center mx-auto mb-6 neon-glow">
              <Check className="h-12 w-12 text-white" />
            </div>
            <h1 className="font-['Orbitron'] font-bold text-3xl mb-4 text-white">
              Booking Confirmed!
            </h1>
            <p className="text-slate-400 mb-6">
              Your bowling reservation has been successfully created.
            </p>
            
            <div className="bg-[hsl(var(--bg-primary))] rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-[hsl(var(--primary))] mb-4">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Booking ID:</span>
                  <span className="font-mono text-[hsl(var(--accent))]">{bookingConfirmed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Activity:</span>
                  <span className="text-white">Strike Zone Bowling</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="text-white">{format(parseISO(formData.date), 'MMM dd, yyyy')} at {formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Guests:</span>
                  <span className="text-white">{formData.adults} Adults, {formData.children} Children</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Games:</span>
                  <span className="text-white">{formData.games} game(s)</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-slate-700 pt-2 mt-2">
                  <span className="text-slate-400">Total:</span>
                  <span className="text-[hsl(var(--accent))]">${calculatePrice().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => window.location.href = '/'} className="btn-primary">
                Return Home
              </button>
              <button onClick={() => window.location.href = '/my-bookings'} className="btn-secondary">
                View All Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['Orbitron'] font-bold text-4xl md:text-5xl mb-4 text-white">
            Book Your Bowling Experience
          </h1>
          <p className="text-xl text-slate-400">
            Reserve your lane at our premium 12-lane bowling center
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step >= stepNum 
                    ? 'bg-[hsl(var(--primary))] text-white neon-glow' 
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    step > stepNum ? 'bg-[hsl(var(--primary))]' : 'bg-slate-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card-elevated p-8">
          {step === 1 && (
            <div className="space-y-8">
              <h2 className="font-['Orbitron'] font-bold text-2xl text-white flex items-center">
                <Users className="h-8 w-8 text-[hsl(var(--primary))] mr-3" />
                Party Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Number of Adults
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, adults: Math.max(0, prev.adults - 1) }))}
                      className="w-12 h-12 bg-slate-700 hover:bg-[hsl(var(--primary))] rounded-lg font-bold text-xl transition-colors"
                    >
                      -
                    </button>
                    <span className="w-16 text-center text-2xl font-bold text-white">{formData.adults}</span>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, adults: Math.min(8, prev.adults + 1) }))}
                      className="w-12 h-12 bg-slate-700 hover:bg-[hsl(var(--primary))] rounded-lg font-bold text-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Number of Children
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                      className="w-12 h-12 bg-slate-700 hover:bg-[hsl(var(--primary))] rounded-lg font-bold text-xl transition-colors"
                    >
                      -
                    </button>
                    <span className="w-16 text-center text-2xl font-bold text-white">{formData.children}</span>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, children: Math.min(6, prev.children + 1) }))}
                      className="w-12 h-12 bg-slate-700 hover:bg-[hsl(var(--primary))] rounded-lg font-bold text-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Number of Games
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((gameCount) => (
                    <button
                      key={gameCount}
                      onClick={() => setFormData(prev => ({ ...prev, games: gameCount }))}
                      className={`p-4 rounded-lg font-semibold transition-all duration-300 ${
                        formData.games === gameCount
                          ? 'bg-[hsl(var(--primary))] text-white neon-glow'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {gameCount}
                    </button>
                  ))}
                </div>
              </div>

              {errors.guests && (
                <div className="flex items-center space-x-2 text-[hsl(var(--error))]">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.guests}</span>
                </div>
              )}

              {errors.games && (
                <div className="flex items-center space-x-2 text-[hsl(var(--error))]">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.games}</span>
                </div>
              )}

              <div className="bg-[hsl(var(--bg-primary))] rounded-lg p-6">
                <h3 className="font-semibold text-[hsl(var(--accent))] mb-3">Estimated Total</h3>
                <p className="text-3xl font-bold text-white">${calculatePrice().toFixed(2)}</p>
                <p className="text-slate-400 text-sm mt-2">
                  Includes {Math.ceil((formData.adults + formData.children) / 6)} lane(s) • Children get 30% discount
                </p>
              </div>

              <button onClick={handleNext} className="w-full btn-primary text-lg py-4">
                Continue to Date & Time
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <h2 className="font-['Orbitron'] font-bold text-2xl text-white flex items-center">
                <Calendar className="h-8 w-8 text-[hsl(var(--primary))] mr-3" />
                Select Date & Time
              </h2>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Choose Date
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setFormData(prev => ({ ...prev, date, time: '' }))}
                      className={`p-3 rounded-lg text-center transition-all duration-300 ${
                        formData.date === date
                          ? 'bg-[hsl(var(--primary))] text-white neon-glow'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      <div className="text-xs text-slate-400">
                        {format(parseISO(date), 'EEE')}
                      </div>
                      <div className="font-semibold">
                        {format(parseISO(date), 'MMM d')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {formData.date && (
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-3">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => {
                      const available = isTimeSlotAvailable(formData.date, time, 'bowling');
                      return (
                        <button
                          key={time}
                          onClick={() => available && setFormData(prev => ({ ...prev, time }))}
                          disabled={!available}
                          className={`p-3 rounded-lg text-center transition-all duration-300 ${
                            formData.time === time
                              ? 'bg-[hsl(var(--primary))] text-white neon-glow'
                              : available
                              ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <Clock className="h-4 w-4 mx-auto mb-1" />
                          <div className="text-sm font-semibold">{time}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {errors.date && (
                <div className="flex items-center space-x-2 text-[hsl(var(--error))]">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.date}</span>
                </div>
              )}

              {errors.time && (
                <div className="flex items-center space-x-2 text-[hsl(var(--error))]">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.time}</span>
                </div>
              )}

              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep(1)} 
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button onClick={handleNext} className="flex-1 btn-primary py-4">
                  Continue to Contact Info
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <h2 className="font-['Orbitron'] font-bold text-2xl text-white flex items-center">
                <Zap className="h-8 w-8 text-[hsl(var(--primary))] mr-3" />
                Confirm Your Booking
              </h2>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email for booking confirmation"
                  className="w-full input-field"
                />
                {errors.email && (
                  <div className="flex items-center space-x-2 text-[hsl(var(--error))] mt-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Booking Summary */}
              <div className="bg-[hsl(var(--bg-primary))] rounded-lg p-6">
                <h3 className="font-semibold text-[hsl(var(--accent))] mb-4">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Activity:</span>
                    <span className="text-white">Strike Zone Bowling</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="text-white">
                      {format(parseISO(formData.date), 'MMM dd, yyyy')} at {formData.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Guests:</span>
                    <span className="text-white">
                      {formData.adults} Adults, {formData.children} Children
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Games:</span>
                    <span className="text-white">{formData.games} game(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lanes Required:</span>
                    <span className="text-white">{Math.ceil((formData.adults + formData.children) / 6)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-slate-300">Total:</span>
                      <span className="text-[hsl(var(--accent))]">${calculatePrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep(2)} 
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button onClick={handleBooking} className="flex-1 btn-primary py-4">
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BowlingBooking;