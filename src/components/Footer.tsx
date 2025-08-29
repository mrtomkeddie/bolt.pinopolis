import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Clock, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[hsl(var(--card))] border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-['Orbitron'] font-bold text-xl text-[hsl(var(--primary))]">
              Pinopolis
            </h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/PinopolisLlanelli/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[hsl(var(--primary))] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/pinopolis_llanelli/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[hsl(var(--primary))] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-[hsl(var(--accent))]" />
                <span className="text-slate-400">Sandy Road<br />Llanelli, SA15 4DP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[hsl(var(--accent))]" />
                <span className="text-slate-400">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-[hsl(var(--accent))]" />
                <div className="text-slate-400">
                  <div>Daily: 10:30am - 10:00pm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Information</h4>
            <div className="space-y-2">
              <Link 
                to="/terms" 
                onClick={() => window.scrollTo(0, 0)}
                className="block text-slate-400 hover:text-[hsl(var(--accent))] transition-colors text-sm"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">
            © 2025 Pinopolis Entertainment Centre. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Built with ⚡ for the ultimate family experience
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;