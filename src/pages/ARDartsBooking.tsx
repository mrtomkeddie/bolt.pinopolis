import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Target, Clock, Calendar, Users, Check, AlertCircle } from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';

const ARDartsBooking: React.FC = () => {
  const { addBooking, generateTimeSlots, isTimeSlotAvailable } = useBooking();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    lanes: 1,
    duration: 60,
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    email: '',
    softPlayAddon: false,
    children: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingConfirmed, setBookingConfirmed] = useState<string>('');

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (formData.lanes < 1 || formData.lanes > 4) {
        newErrors.lanes = 'Please select 1-4 dart lanes';
      }
      if (![30, 60].includes(formData.duration)) {
        newErrors.duration = 'Please select a valid duration';
      }
      if (formData.softPlayAddon && formData.children < 1) {
        newErrors.children = 'Please specify number of children for soft play addon';
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
    const basePrice = formData.duration === 60 ? 25 : 15; // per lane per session
    const lanesPrice = basePrice * formData.lanes;
    const softPlayPrice = formData.softPlayAddon ? formData.children * 12 : 0;
    
    return lanesPrice + softPlayPrice;
  };

  const handleBooking = () => {
    if (validateStep(3)) {
      const bookingId = addBooking({
        activity: 'ar-darts',
        date: formData.date,
        time: formData.time,
        guests: {
          adults: formData.lanes * 2, // Assume 2 adults per lane
          children: formData.softPlayAddon ? formData.children : 0
        },
        details: {
          lanes: formData.lanes,
          duration: formData.duration,
          softPlayAddon: formData.softPlayAddon
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
              AR Darts Reserved!
            </h1>
            <p className="text-slate-400 mb-6">
              Your augmented reality darts session has been successfully booked.
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
                  <span className="text-white">AR Darts Arena</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="text-white">{format(parseISO(formData.date), 'MMM dd, yyyy')} at {formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dart Lanes:</span>
                  <span className="text-white">{formData.lanes} lane(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-white">{formData.duration} minutes</span>
                </div>
                {formData.softPlayAddon && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Soft Play Add-on:</span>
                    <span className="text-white">{formData.children} children</span>
                  </div>
                )}
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
            AR Darts Arena Booking
          </h1>
          <p className="text-xl text-slate-400">
            Experience the future of darts with augmented reality technology
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
                <Target className="h-8 w-8 text-[hsl(var(--primary))] mr-3" />
                Session Configuration
              </h2>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Number of Dart Lanes
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((laneCount) => (
                    <button
                      key={laneCount}
                      onClick={() => setFormData(prev => ({ ...prev, lanes: laneCount }))}
                      className={`p-6 rounded-lg font-semibold transition-all duration-300 ${
                        formData.lanes === laneCount
                          ? 'bg-[hsl(var(--primary))] text-white neon-glow'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      <Target className="h-8 w-8 mx-auto mb-2" />
                      <div>{laneCount} Lane{laneCount > 1 ? 's' : ''}</div>
                      <div className="text-xs text-slate-400 mt-1">Up to {laneCount * 4} players</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">
                  Session Duration
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, duration: 30 }))}
                    className={`p-6 rounded-lg font-semibold transition-all duration-300 ${
                      formData.duration === 30
                        ? 'bg-[hsl(var(--primary))] text-white neon-glow'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <div>30 Minutes</div>
                    <div className="text-xs text-slate-400 mt-1">Quick session</div>
                    <div className="text-[hsl(var(--accent))] font-bold mt-2">$15/lane</div>
                  </button>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, duration: 60 }))}
                    className={`p-6 rounded-lg font-semibold transition-all duration-300 ${
                      formData.duration === 60
                        ? 'bg-[hsl(var(--primary))] text-white neon-glow'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <div>60 Minutes</div>
                    <div className="text-xs text-slate-400 mt-1">Full experience</div>
                    <div className="text-[hsl(var(--accent))] font-bold mt-2">$25/lane</div>
                  </button>
                </div>
              </div>

              {/* Soft Play Addon */}
              <div className="border-t border-slate-700 pt-8">
                <div className="flex items-start space-x-4">
                  <input
                    type="checkbox"
                    id="softPlay"
                    checked={formData.softPlayAddon}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      softPlayAddon: e.target.checked,
                      children: e.target.checked ? Math.max(1, prev.children) : 0
                    }))}
                    className="mt-1 w-5 h-5 text-[hsl(var(--primary))] rounded focus:ring-[hsl(var(--primary))]"
                  />
                  <div className="flex-1">
                    <label htmlFor="softPlay" className="font-semibold text-white cursor-pointer">
                      Add Concurrent Soft Play Session
                    </label>
                    <p className="text-slate-400 text-sm mt-1">
                      Perfect for families with young children. Kids can enjoy soft play while adults play darts.
                    </p>
                  </div>
                </div>

                {formData.softPlayAddon && (
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                      Number of Children (Ages 2-12)
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, children: Math.max(1, prev.children - 1) }))}
                        className="w-12 h-12 bg-slate-700 hover:bg-[hsl(var(--primary))] rounded-lg font-bold text-xl transition-colors"
                      >
                        -
                      </button>
                      <span className="w-16 text-center text-2xl font-bold text-white">{formData.children}</span>
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, children: Math.min(8, prev.children + 1) }))}
                        className="w-12 h-12 bg-slate-700 hover:bg-[hsl(var(--primary))] rounded-lg font-bold text-xl transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">Additional $12 per child</p>
                  </div>
                )}
              </div>

              {Object.entries(errors).map(([key, error]) => (
                <div key={key} className="flex items-center space-x-2 text-[hsl(var(--error))]">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              ))}

              <div className="bg-[hsl(var(--bg-primary))] rounded-lg p-6">
                <h3 className="font-semibold text-[hsl(var(--accent))] mb-3">Estimated Total</h3>
                <p className="text-3xl font-bold text-white">${calculatePrice().toFixed(2)}</p>
                <div className="text-slate-400 text-sm mt-2 space-y-1">
                  <p>{formData.lanes} lane(s) × {formData.duration} minutes</p>
                  {formData.softPlayAddon && <p>+ Soft play for {formData.children} children</p>}
                </div>
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
                      const available = isTimeSlotAvailable(formData.date, time, 'ar-darts');
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
                <Target className="h-8 w-8 text-[hsl(var(--primary))] mr-3" />
                Confirm Your AR Darts Session
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
                    <span className="text-white">AR Darts Arena</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="text-white">
                      {format(parseISO(formData.date), 'MMM dd, yyyy')} at {formData.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dart Lanes:</span>
                    <span className="text-white">{formData.lanes} lane(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-white">{formData.duration} minutes</span>
                  </div>
                  {formData.softPlayAddon && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Soft Play Add-on:</span>
                      <span className="text-white">{formData.children} children</span>
                    </div>
                  )}
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

export default ARDartsBooking;