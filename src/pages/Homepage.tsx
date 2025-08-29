import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Zap, Target, Baby, MapPin, Wifi, Car, Coffee, BadgeDollarSign, ChevronDown, Utensils, Beer, Gamepad2 as Gamepad, Tv, Wine as Cocktail, Sparkles } from 'lucide-react';

const Homepage: React.FC = () => {
  const [expandedDeal, setExpandedDeal] = React.useState<string | null>(null);

  const toggleDeal = (dealId: string) => {
    setExpandedDeal(expandedDeal === dealId ? null : dealId);
  };

  const activities = [
    {
      id: 'bowling',
      title: 'Strike Zone Bowling',
      description: 'Experience our state-of-the-art 12-lane bowling alley with cosmic lighting, premium sound systems, and comfortable seating areas.',
      image: 'https://images.pexels.com/photos/625219/pexels-photo-625219.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Zap className="h-8 w-8" />,
      link: '/bowling',
      price: 'From $15/game'
    },
    {
      id: 'ar-darts',
      title: 'AR Darts Arena',
      description: 'Revolutionary augmented reality darts combining traditional skill with cutting-edge technology for an immersive gaming experience.',
      image: 'https://images.pexels.com/photos/6266442/pexels-photo-6266442.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Target className="h-8 w-8" />,
      link: '/ar-darts',
      price: 'From $25/hour'
    },
    {
      id: 'soft-play',
      title: 'Adventure Soft Play',
      description: 'Safe, supervised play area designed for children ages 2-12 with slides, climbing structures, and interactive learning zones.',
      image: 'https://images.pexels.com/photos/8613104/pexels-photo-8613104.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Baby className="h-8 w-8" />,
      link: '/soft-play',
      price: 'From $12/child'
    }
  ];

  const amenities = [
    { icon: <Wifi className="h-6 w-6" />, title: 'Free Wi-Fi', description: 'High-speed internet throughout' },
    { icon: <Car className="h-6 w-6" />, title: 'Free Parking', description: 'Ample parking spaces available' },
    { icon: <Coffee className="h-6 w-6" />, title: 'Café & Snacks', description: 'Fresh food and beverages' },
    { icon: <Users className="h-6 w-6" />, title: 'Party Packages', description: 'Birthday and group events' }
  ];

  const weeklySpecials = [
    {
      id: 'money-saving-monday',
      day: 'Money Saving Monday!',
      offer: '1 Game of Bowling & any pint',
      price: '£6 per person',
      availability: 'Mondays between 11am-close',
      restriction: 'You must be 18+ to reserve this package',
      description: 'Beat the Monday blues with our unbeatable deal!',
      details: [
        'A bottle of rose, white or red wine & a game of bowling for 2 guests.',
        'Available on: Mondays between 11am-close.',
        '£6 per person.',
        'You must be 18+ to reserve this package.'
      ]
    },
    {
      id: 'triple-tuesday',
      day: 'Triple Tuesday!',
      offer: '2 Games of Bowling per group & 1 O.G Burger per person',
      price: '£15 per person',
      availability: 'Tuesdays between 11am-close',
      restriction: null,
      description: 'Triple the fun with bowling and delicious food!',
      details: [
        '2 Games of Bowling per group & 1 O.G Burger per person.',
        'Available on: Tuesdays between 11am-close.',
        '£15 per person.'
      ]
    },
    {
      id: 'wine-wednesday',
      day: 'Wine Wednesday!',
      offer: 'A bottle of rose, white or red wine & a game of bowling for 2 guests',
      price: '£15 for 2 guests, £3 per additional guest',
      availability: 'Wednesdays between 11am-close',
      restriction: 'You must be 18+ to reserve this package',
      description: 'Unwind midweek with wine and bowling!',
      details: [
        'A bottle of rose, white or red wine & a game of bowling for 2 guests.',
        'Available on: Wednesdays between 11am-close.',
        '£15 for 2 guests, £3 per additional guest.',
        'You must be 18+ to reserve this package.'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/625219/pexels-photo-625219.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-['Orbitron'] font-black text-5xl md:text-7xl mb-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            Welcome to Pinopolis!
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
            Your Ultimate Family Entertainment Centre
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#activities" className="btn-primary text-lg px-8 py-4">
              Book Your Adventure
            </a>
          </div>
        </div>

        {/* Animated elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-[hsl(var(--primary))] rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-[hsl(var(--accent))] rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-[hsl(var(--primary))] rounded-full animate-pulse delay-700"></div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Zap className="h-8 w-8 text-[hsl(var(--accent))]" />
              <h2 className="font-['Orbitron'] font-bold text-2xl text-[hsl(var(--accent))]">
                Our Activities
              </h2>
            </div>
            <h2 className="font-['Orbitron'] font-bold text-4xl md:text-5xl mb-4 text-white sr-only">
              Our Activities
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Discover endless entertainment options for the whole family.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div key={activity.id} className="card-elevated group hover:scale-105 transition-transform duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-[hsl(var(--card))]/90 backdrop-blur-sm rounded-full p-2 text-[hsl(var(--accent))]">
                    {activity.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Orbitron'] font-bold text-xl mb-3 text-white">
                    {activity.title}
                  </h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[hsl(var(--accent))] font-semibold">
                      {activity.price}
                    </span>
                    <Link 
                      to={activity.link}
                      className="btn-primary px-4 py-2 text-sm"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Specials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <BadgeDollarSign className="h-8 w-8 text-[hsl(var(--accent))]" />
              <h2 className="font-['Orbitron'] font-bold text-2xl text-[hsl(var(--accent))]">
                Weekly Specials
              </h2>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Unbeatable deals throughout the week for maximum fun and savings.
            </p>
          </div>

          <div className="card-elevated p-8">
            <div className="space-y-4">
              {weeklySpecials.map((special) => (
                <div key={special.id} className="border border-slate-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleDeal(special.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors duration-200"
                    aria-expanded={expandedDeal === special.id}
                    aria-controls={`deal-${special.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <BadgeDollarSign className="h-5 w-5 text-[hsl(var(--primary))]" />
                      <span className="font-semibold text-white">{special.day}</span>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                        expandedDeal === special.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div 
                    id={`deal-${special.id}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedDeal === special.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 pt-4 border-t border-slate-700">
                      <ul className="space-y-3 mb-6 text-sm text-slate-300">
                        {special.details.map((detail, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-[hsl(var(--primary))] rounded-full mt-2 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                      <Link 
                        to={`/bowling?deal=${special.id}`}
                        className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
                      >
                        <span>Book This Deal</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dining & Drinks Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Utensils className="h-8 w-8 text-[hsl(var(--accent))]" />
              <h2 className="font-['Orbitron'] font-bold text-2xl text-[hsl(var(--accent))]">
                Dining & Drinks
              </h2>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Delicious food and refreshing drinks to fuel your entertainment experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card-elevated p-6 text-center">
              <div className="w-16 h-16 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center mx-auto mb-4">
                <Beer className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-['Orbitron'] font-bold text-lg text-white mb-3">
                Draft Beer
              </h3>
              <p className="text-slate-400 text-sm">
                Premium selection of local and international beers on tap, perfectly chilled and ready to enjoy.
              </p>
            </div>

            <div className="card-elevated p-6 text-center">
              <div className="w-16 h-16 bg-[hsl(var(--primary))] rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-['Orbitron'] font-bold text-lg text-white mb-3">
                American Style Street Food
              </h3>
              <p className="text-slate-400 text-sm">
                Authentic American classics including gourmet burgers, loaded fries, and signature sandwiches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Fun Awaits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Gamepad className="h-8 w-8 text-[hsl(var(--accent))]" />
              <h2 className="font-['Orbitron'] font-bold text-2xl text-[hsl(var(--accent))]">
                More Fun Awaits
              </h2>
            </div>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Additional entertainment options to complete your perfect day out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-elevated overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/7862492/pexels-photo-7862492.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="VR Arcade"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-['Orbitron'] font-bold text-xl text-white mb-4">
                  VR Arcade
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Step into virtual worlds with our cutting-edge VR gaming stations. Experience immersive adventures, 
                  thrilling simulations, and multiplayer challenges that transport you to entirely new dimensions of entertainment.
                </p>
              </div>
            </div>

            <div className="card-elevated overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1040473/pexels-photo-1040473.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Pool Tables"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="font-['Orbitron'] font-bold text-xl text-white mb-4">
                  Pool Tables
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Professional-grade pool tables in a comfortable setting. Perfect for casual games with friends 
                  or competitive matches. All equipment provided including premium cues and chalk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Sparkles className="h-8 w-8 text-[hsl(var(--accent))]" />
            <h2 className="font-['Orbitron'] font-bold text-2xl text-[hsl(var(--accent))]">
              Ready to Create Memories?
            </h2>
          </div>
          <p className="text-xl text-slate-400 mb-8">
            Book your perfect family experience today and discover why we're the premier 
            entertainment destination for families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/bowling" className="btn-primary text-lg px-8 py-4">
              Book Bowling Now
            </Link>
            <Link to="/ar-darts" className="btn-secondary text-lg px-8 py-4">
              Try AR Darts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;