import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Baby, Calendar, Clock, Check, AlertCircle } from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';

const SoftPlayBooking: React.FC = () => {
  const { addBooking, generateTimeSlots, isTimeSlotAvailable } = useBooking();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    children: 1,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingConfirmed, setBookingConfirmed] = useState<string>('');

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (formData.children < 1 || formData.children > 10) {
        newErrors.children = 'Please select 1-10 children';
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
    const basePrice = 12; // per child
    return basePrice * formData.children;
  };

  const handleBooking = () => {
    if (validateStep(3)) {
      const bookingId = addBooking({
        activity: 'soft-play',
        date: formData.date,
        time: formData.time,
        guests: {
          children: formData.children
        },
        details: {
          duration: 120 // 2 hours standard session
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

  const timeSlots = generateTimeSlots(formData.date).filter(time => {
    const hour = parseInt(time.split(':')[0]);
    return hour >= 10 && hour <= 18; // Soft play typically closes earlier
  });

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="card-elevated p-12">
            <div className="w-24 h-24 bg-[hsl(var(--success))] rounded-full flex items-center justify-center mx-auto mb-6 neon-glow">
              <Check className="h-12 w-12 text-white" />
            </div>
            <h1 className="font-['Orbitron'] font-bold text-3xl mb-4 text-white">
              Soft Play Reserved!
            </h1>
            <p className="text-slate-400 mb-6">
              Your children's soft play session has been successfully booked.
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
                  <span className="text-white">Adventure Soft Play</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="text-white">{format(parseISO(formData.date), 'MMM dd, yyyy')} at {formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Children:</span>
                  <span className="text-white">{formData.children} child{formData.children > 1 ? 'ren' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Session Duration:</span>
                  <span className="text-white">2 hours</span>
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
            Adventure Soft Play Booking
          </h1>
          <p className="text-xl text-slate-400">
            Safe, supervised play for children ages 2-12 years
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
                <Baby className="h-8 w-8 text-[hsl(var(--primary))] mr-3" />
                Children Information
              </h2>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Number of Children (Ages 2-12)
                </label>
                <div className="flex items-center justify-center space-x-6">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, children: Math.max(1, prev.children - 1) }))}
                    className="w-16 h-16 bg-slate-700 hover:bg-[hsl(var(--primary))] rounded-lg font-bold text-2xl transition-colors"
                  >
                    -
                  </button>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">{formData.children}</div>
                    <div className="text-slate-400">child{formData.children > 1 ? 'ren' : ''}</div>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, children: Math.min(10, prev.children + 1) }))}
                    className="w-16 h-16 bg-slate-700 hover:bg-[hsl(var(--primary))] rounded-lg font-bold text-2xl transition-colors"
                  >
                    +
                  </button>
                </div>
                <p className="text-center text-slate-400 text-sm mt-4">
                  All children must be supervised by an adult (free adult admission)
                </p>
              </div>

              {/* Safety Guidelines */}
              <div className="bg-[hsl(var(--bg-primary))] rounded-lg p-6">
                <h3 className="font-semibold text-[hsl(var(--accent))] mb-4">Safety Guidelines</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                    <span>Children ages 2-12 years only</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                    <span>Socks required for all children</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                    <span>Adult supervision required at all times</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                    <span>2-hour session with unlimited play</span>
                  </div>
                </div>
              </div>

              {errors.children && (
                <div className="flex items-center space-x-2 text-[hsl(var(--error))]">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errors.children}</span>
                </div>
              )}

              <div className="bg-[hsl(var(--bg-primary))] rounded-lg p-6">
                <h3 className="font-semibold text-[hsl(var(--accent))] mb-3">Session Total</h3>
                <p className="text-3xl font-bold text-white">${calculatePrice().toFixed(2)}</p>
                <p className="text-slate-400 text-sm mt-2">
                  2-hour unlimited play session • Adults play for free
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
                    Available Time Slots (2-hour sessions)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {timeSlots.map((time) => {
                      const available = isTimeSlotAvailable(formData.date, time, 'soft-play');
                      return (
                        <button
                          key={time}
                          onClick={() => available && setFormData(prev => ({ ...prev, time }))}
                          disabled={!available}
                          className={`p-4 rounded-lg text-center transition-all duration-300 ${
                            formData.time === time
                              ? 'bg-[hsl(var(--primary))] text-white neon-glow'
                              : available
                              ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <Clock className="h-5 w-5 mx-auto mb-2" />
                          <div className="font-semibold">{time}</div>
                          <div className="text-xs text-slate-400 mt-1">
                            {available ? 'Available' : 'Full'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {Object.entries(errors).map(([key, error]) => (
                <div key={key} className="flex items-center space-x-2 text-[hsl(var(--error))]">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              ))}

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
                <Baby className="h-8 w-8 text-[hsl(var(--primary))] mr-3" />
                Confirm Your Soft Play Session
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
                    <span className="text-white">Adventure Soft Play</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="text-white">
                      {format(parseISO(formData.date), 'MMM dd, yyyy')} at {formData.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Children:</span>
                    <span className="text-white">{formData.children} child{formData.children > 1 ? 'ren' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Session Duration:</span>
                    <span className="text-white">2 hours</span>
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

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="card-elevated p-6">
            <h3 className="font-['Orbitron'] font-bold text-lg text-[hsl(var(--primary))] mb-3">
              What's Included
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                <span>2-hour unlimited play session</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                <span>Access to all play structures</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                <span>Interactive learning zones</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                <span>Free adult supervision entry</span>
              </li>
            </ul>
          </div>

          <div className="card-elevated p-6">
            <h3 className="font-['Orbitron'] font-bold text-lg text-[hsl(var(--primary))] mb-3">
              Important Notes
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                <span>Socks required for all children</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                <span>Adult supervision mandatory</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                <span>Hand sanitizer stations available</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                <span>Maximum 10 children per booking</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftPlayBooking;