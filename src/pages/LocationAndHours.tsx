import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';

const LocationAndHours: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center space-x-2 text-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] transition-colors mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center">
            <h1 className="font-['Orbitron'] font-bold text-4xl md:text-5xl mb-4 text-white">
              Where Are We
            </h1>
            <p className="text-xl text-slate-400">
              Visit us at Pinopolis Entertainment Centre
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Location & Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="card-elevated p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-8 w-8 text-[hsl(var(--primary))]" />
                <h2 className="font-['Orbitron'] font-bold text-2xl text-[hsl(var(--accent))]">
                  Our Location
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="text-lg text-white">
                  <div className="font-semibold">Pinopolis Entertainment Centre</div>
                  <div className="text-slate-300 mt-2 space-y-1">
                    <div>Sandy Road</div>
                    <div>Llanelli</div>
                    <div>SA15 4DP</div>
                    <div>Wales, United Kingdom</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-700">
                  <a 
                    href="https://maps.google.com/?q=Sandy+Road,+Llanelli,+SA15+4DP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] transition-colors"
                  >
                    <Navigation className="h-5 w-5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card-elevated p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Phone className="h-8 w-8 text-[hsl(var(--primary))]" />
                <h2 className="font-['Orbitron'] font-bold text-2xl text-[hsl(var(--accent))]">
                  Contact Us
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <a href="tel:+441554123456" className="text-slate-300 hover:text-[hsl(var(--accent))] transition-colors">
                      +44 1554 123456
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[hsl(var(--accent))]" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a href="mailto:info@pinopolis.co.uk" className="text-slate-300 hover:text-[hsl(var(--accent))] transition-colors">
                      info@pinopolis.co.uk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="card-elevated p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="h-8 w-8 text-[hsl(var(--primary))]" />
                <h2 className="font-['Orbitron'] font-bold text-2xl text-[hsl(var(--accent))]">
                  Opening Hours
                </h2>
              </div>
              
              <div className="space-y-3">
                {[
                  { day: 'Monday', hours: '10:30 AM - 10:00 PM' },
                  { day: 'Tuesday', hours: '10:30 AM - 10:00 PM' },
                  { day: 'Wednesday', hours: '10:30 AM - 10:00 PM' },
                  { day: 'Thursday', hours: '10:30 AM - 10:00 PM' },
                  { day: 'Friday', hours: '10:30 AM - 11:00 PM' },
                  { day: 'Saturday', hours: '10:00 AM - 11:00 PM' },
                  { day: 'Sunday', hours: '10:00 AM - 10:00 PM' }
                ].map((schedule) => (
                  <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-slate-700 last:border-b-0">
                    <span className="font-semibold text-white">{schedule.day}</span>
                    <span className="text-slate-300">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-[hsl(var(--bg-primary))] rounded-lg">
                <p className="text-sm text-slate-400">
                  <strong className="text-[hsl(var(--accent))]">Note:</strong> Last bookings accepted 1 hour before closing time. 
                  Holiday hours may vary - please call ahead to confirm.
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="lg:sticky lg:top-24">
            <div className="card-elevated p-6">
              <h2 className="font-['Orbitron'] font-bold text-2xl text-[hsl(var(--accent))] mb-6">
                Find Us on the Map
              </h2>
              
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Sandy+Road,+Llanelli,+SA15+4DP,+Wales,+UK&zoom=15"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pinopolis Entertainment Centre Location"
                  className="rounded-lg"
                ></iframe>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-slate-400 text-sm mb-4">
                  Located in the heart of Llanelli with easy access and ample parking
                </p>
                <a 
                  href="https://maps.google.com/?q=Sandy+Road,+Llanelli,+SA15+4DP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Navigation className="h-5 w-5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="card-elevated p-6 text-center">
            <div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Easy to Find</h3>
            <p className="text-slate-400 text-sm">
              Conveniently located on Sandy Road with clear signage and easy access from main roads.
            </p>
          </div>
          
          <div className="card-elevated p-6 text-center">
            <div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Call Ahead</h3>
            <p className="text-slate-400 text-sm">
              We recommend calling ahead for large groups or special events to ensure availability.
            </p>
          </div>
          
          <div className="card-elevated p-6 text-center">
            <div className="w-12 h-12 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-white mb-2">Extended Hours</h3>
            <p className="text-slate-400 text-sm">
              Open late on weekends for your convenience. Perfect for evening entertainment.
            </p>
          </div>
        </div>

        {/* Return to Home */}
        <div className="text-center mt-12">
          <Link to="/" className="btn-primary inline-flex items-center space-x-2 px-8 py-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Return to Pinopolis</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationAndHours;