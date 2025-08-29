import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { Mail, Search, Calendar, Clock, Users, MapPin, AlertCircle, Trash2, Target, Zap, Baby } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const MyBookings: React.FC = () => {
  const { getBookingsByEmail, cancelBooking } = useBooking();
  const [email, setEmail] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [showCancelModal, setShowCancelModal] = useState<string>('');

  const handleSearch = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return;
    }
    
    const userBookings = getBookingsByEmail(email);
    setBookings(userBookings);
    setSearchPerformed(true);
  };

  const handleCancel = (bookingId: string) => {
    cancelBooking(bookingId);
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    setShowCancelModal('');
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'bowling':
        return <Zap className="h-6 w-6 text-[hsl(var(--primary))]" />;
      case 'ar-darts':
        return <Target className="h-6 w-6 text-[hsl(var(--primary))]" />;
      case 'soft-play':
        return <Baby className="h-6 w-6 text-[hsl(var(--primary))]" />;
      default:
        return <MapPin className="h-6 w-6 text-[hsl(var(--primary))]" />;
    }
  };

  const getActivityName = (activity: string) => {
    switch (activity) {
      case 'bowling':
        return 'Strike Zone Bowling';
      case 'ar-darts':
        return 'AR Darts Arena';
      case 'soft-play':
        return 'Adventure Soft Play';
      default:
        return activity;
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['Orbitron'] font-bold text-4xl md:text-5xl mb-4 text-white">
            My Bookings
          </h1>
          <p className="text-xl text-slate-400">
            View and manage your Family Fun Zone reservations
          </p>
        </div>

        {/* Search Section */}
        {!searchPerformed && (
          <div className="card-elevated p-8 mb-8">
            <div className="text-center mb-8">
              <Mail className="h-16 w-16 text-[hsl(var(--primary))] mx-auto mb-4" />
              <h2 className="font-['Orbitron'] font-bold text-2xl text-white mb-2">
                Find Your Bookings
              </h2>
              <p className="text-slate-400">
                Enter the email address you used when making your reservations
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex space-x-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 input-field"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  disabled={!email || !/\S+@\S+\.\S+/.test(email)}
                  className="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {searchPerformed && (
          <div className="space-y-6">
            {/* Search Header */}
            <div className="card-elevated p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-['Orbitron'] font-bold text-xl text-white">
                    Bookings for {email}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setSearchPerformed(false);
                    setBookings([]);
                    setEmail('');
                  }}
                  className="btn-secondary"
                >
                  New Search
                </button>
              </div>
            </div>

            {/* Bookings List */}
            {bookings.length === 0 ? (
              <div className="card-elevated p-12 text-center">
                <AlertCircle className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                <h3 className="font-['Orbitron'] font-bold text-xl text-white mb-2">
                  No Bookings Found
                </h3>
                <p className="text-slate-400 mb-6">
                  We couldn't find any reservations for this email address.
                </p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="btn-primary"
                >
                  Make a Booking
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="card-elevated p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Booking Info */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center space-x-3">
                          {getActivityIcon(booking.activity)}
                          <div>
                            <h3 className="font-['Orbitron'] font-bold text-lg text-white">
                              {getActivityName(booking.activity)}
                            </h3>
                            <p className="text-slate-400 text-sm">
                              Booking ID: <span className="font-mono text-[hsl(var(--accent))]">{booking.id}</span>
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-[hsl(var(--accent))]" />
                            <span className="text-slate-300">
                              {format(parseISO(booking.date), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-[hsl(var(--accent))]" />
                            <span className="text-slate-300">{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-[hsl(var(--accent))]" />
                            <span className="text-slate-300">
                              {booking.guests.adults ? `${booking.guests.adults} Adults` : ''}
                              {booking.guests.adults && booking.guests.children ? ', ' : ''}
                              {booking.guests.children ? `${booking.guests.children} Children` : ''}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-400">Total:</span>
                            <span className="text-[hsl(var(--accent))] font-bold">
                              ${booking.totalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Activity-specific details */}
                        <div className="bg-[hsl(var(--bg-primary))] rounded-lg p-4">
                          <div className="text-xs text-slate-400 space-y-1">
                            {booking.activity === 'bowling' && (
                              <>
                                <div>Games: {booking.details.games}</div>
                                <div>Lanes: {booking.details.lanes}</div>
                              </>
                            )}
                            {booking.activity === 'ar-darts' && (
                              <>
                                <div>Dart Lanes: {booking.details.lanes}</div>
                                <div>Duration: {booking.details.duration} minutes</div>
                                {booking.details.softPlayAddon && <div>Includes soft play addon</div>}
                              </>
                            )}
                            {booking.activity === 'soft-play' && (
                              <div>Duration: {booking.details.duration} minutes</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-3">
                        <button
                          onClick={() => setShowCancelModal(booking.id)}
                          className="bg-[hsl(var(--error))] hover:bg-[hsl(var(--error))]/90 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Cancel</span>
                        </button>
                        <div className="text-center text-xs text-slate-500">
                          Booked {format(parseISO(booking.createdAt), 'MMM dd, yyyy')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card-elevated p-8 max-w-md w-full">
              <h3 className="font-['Orbitron'] font-bold text-xl text-white mb-4">
                Cancel Booking?
              </h3>
              <p className="text-slate-400 mb-6">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowCancelModal('')}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => handleCancel(showCancelModal)}
                  className="flex-1 bg-[hsl(var(--error))] hover:bg-[hsl(var(--error))]/90 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;