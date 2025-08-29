import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import BowlingBooking from './pages/BowlingBooking';
import ARDartsBooking from './pages/ARDartsBooking';
import SoftPlayBooking from './pages/SoftPlayBooking';
import MyBookings from './pages/MyBookings';
import LocationAndHours from './pages/LocationAndHours';
import Terms from './pages/Terms';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-white font-['Poppins']">
          <Header />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/bowling" element={<BowlingBooking />} />
              <Route path="/ar-darts" element={<ARDartsBooking />} />
              <Route path="/soft-play" element={<SoftPlayBooking />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/location-hours" element={<LocationAndHours />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;