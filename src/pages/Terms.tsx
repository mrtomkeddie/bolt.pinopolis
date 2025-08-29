import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Clock, Users, AlertTriangle, Phone } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center space-x-2 text-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] transition-colors mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center">
            <h1 className="font-['Orbitron'] font-bold text-4xl md:text-5xl mb-4 text-white">
              Terms & Conditions
            </h1>
            <p className="text-xl text-slate-400">
              Pinopolis Entertainment Centre
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Last updated: August 28, 2025
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* General Admission */}
          <section className="card-elevated p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-[hsl(var(--primary))]" />
              <h2 className="font-['Orbitron'] font-bold text-2xl text-white">
                General Admission
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>We request that you arrive at least 15 minutes before your allocated time slot to allow you to comply with all the registration formalities.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Anyone who is considered to be intimidating or aggressive to our customers or team members will be asked to leave immediately and will be refused future admission at all of our venues.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Please remove hoods, helmets and caps when you enter our venue.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Please comply with our strict no-smoking policy throughout the building which also includes e-cigarettes.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Do not bring in food or drink from elsewhere.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>The Management at all our venues reserves the right at all times to search customers and refuse admission at our absolute discretion at any time.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Alcohol & Social Responsibility */}
          <section className="card-elevated p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-8 w-8 text-[hsl(var(--primary))]" />
              <h2 className="font-['Orbitron'] font-bold text-2xl text-white">
                Alcohol & Social Responsibility
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                We operate all our licensed venues responsibly, safely and within the law. We want our guests to enjoy visiting us and to find safe, welcoming environments, which neither condone nor encourage excessive drinking. We support the objectives of the Licensing Act 2003 and the Licensing (Scotland) Act 2005. We always seek to work closely and constructively with key authorities including Police, Fire, Environmental Health and Local Authorities.
              </p>
              <p>
                We actively operate the 'Challenge 25' Policy.
              </p>
            </div>
          </section>

          {/* Private Hire Terms */}
          <section className="card-elevated p-8">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-[hsl(var(--primary))]" />
              <h2 className="font-['Orbitron'] font-bold text-2xl text-white">
                Private Hire Terms
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Please contact the venue directly for the Private Hire Terms and Conditions.
              </p>
            </div>
          </section>

          {/* Terms and Conditions */}
          <section className="card-elevated p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="h-8 w-8 text-[hsl(var(--primary))]" />
              <h2 className="font-['Orbitron'] font-bold text-2xl text-white">
                Terms and Conditions
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>All our children's prices apply to children aged 15 and under.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Student discount will only be given when presented with a valid student id card at the time of booking.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Bookings will only be considered final when full payment has been made and an official receipt or e-mail confirmation has been issued by Pinopolis. It is your responsibility to check the accuracy of your booking and report any mistakes to Pinopolis within 24 hrs of receiving the confirmation.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Pinopolis will use all reasonable endeavours to ensure that your booking commences at the time slot allocated. However, it is your responsibility to ensure that you and the members of your group arrive on time. We can only hold your lane for 10 minutes. After this time, we cannot guarantee your booking. However, we will do our best to fit you in if we can.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Pinopolis is not under any obligation to offer any refunds for pre-purchased bowling time. If you have pre-purchased bowling time, you may not exchange your allocated time slot for another, unless permitted by a member of Pinopolis Management.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>No booking can be cancelled past its start time; this qualifies as a no-show; no refund can be offered and cancellation fees may apply.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Bookings are only valid for the date and time shown and are void if tampered with and are strictly non-transferable.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Pinopolis are entitled to cancel your booking at any time. In the event of a cancellation by Pinopolis, you shall be entitled to a full refund or the option to reschedule, but no other compensation shall be payable.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Pinopolis will process any information that we collect from you in accordance with our Privacy Policy which is available on request or from our website.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Pinopolis reserves the right to limit the availability and/or change any of its Activities at any time.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>Pinopolis will not be held responsible for any loss or damage to any of your personal belongings during your visit to the venue.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>If you, or any member of your group causes any damage to any of the alley's facilities, fixtures, or fittings, then you will be liable for the costs of repairing such damage and any loss of business incurred by that damage. The cost of any such repairs will be charged to the person responsible for the booking.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>The Terms and Conditions (together with any applicable Pinopolis Rules and Privacy Policy) set out the terms on which you agree to take part in the activities at Pinopolis. Please confirm that you accept the Conditions and agree to comply with them. If you do not agree to these Conditions, you/your child must not take part in any Activities in the venue.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full mt-2"></div>
                  <span>The Activities are provided by Pinopolis Limited, trading as Pinopolis which is a limited liability partnership incorporated in England and Wales under Company Number:07444964 and whose registered office address is at 45 High Street, Haverford West, Wales, SA61 2BP</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Governing Law */}
          <section className="card-elevated p-8">
            <h2 className="font-['Orbitron'] font-bold text-2xl text-white mb-6">
              Governing Law
            </h2>
            
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                These Conditions and any dispute or claim (including non-contractual disputes and claims) arising out of or in connection with it or its subject matter or formation shall be governed by, and construed in accordance with the law of territory of incorporation.
              </p>
              <p>
                The courts of territory of incorporation shall have exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes and claims) arising out of or in connection with these Conditions or its subject matter or formation.
              </p>
              <p>
                Nothing in these Conditions shall limit or exclude Pinopolis liability for: death or personal injury caused by its negligence, or the negligence of its employees or agents; or fraud or fraudulent misrepresentation.
              </p>
            </div>
          </section>

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

export default Terms;